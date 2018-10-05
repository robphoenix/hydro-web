package main

import (
  "encoding/json"
  "io/ioutil"
  "log"
  "net/http"
  "os"
  "strconv"

  "github.com/gorilla/mux"
)

// The API bit will be eventually removed when it get's replaced by vert.x API

func main() {
  // Router for Angular client
  staticRouter := mux.NewRouter()
  staticRouter.PathPrefix("/").Handler(wrapHandler(http.FileServer(http.Dir("../dist/hydro-poc"))))

  // Router for JSON Mock API
  jsonRouter := mux.NewRouter()

  // Dealing with CORS and preflight requests
  jsonRouter.Methods("OPTIONS").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
    w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, Access-Control-Request-Headers, Access-Control-Request-Method, Connection, Host, Origin, User-Agent, Referer, Cache-Control, X-header")
    w.WriteHeader(http.StatusNoContent)
    return
  })

  jsonRouter.HandleFunc("/liveMonitors", liveMonitors).Methods("GET")
  jsonRouter.HandleFunc("/liveMonitors/{id}", liveMonitorsByID).Methods("GET")
  jsonRouter.HandleFunc("/monitorData/{id}", monitorDataByID).Methods("GET")
  jsonRouter.HandleFunc("/searchData", searchData).Methods("GET")

  shutdown := make(chan bool)

  // Serve both routers in different ports
  go func() {
    log.Println("Serving static content on 4200")
    err := http.ListenAndServe(":4200", staticRouter)
    if err != nil {
      panic("ListenAndServe: " + err.Error())
    }
    shutdown <- true
  }()
  go func() {
    log.Println("Serving json mock data on 3000")
    err := http.ListenAndServe(":3000", jsonRouter)
    if err != nil {
      panic("ListenAndServe: " + err.Error())
    }
    shutdown <- true
  }()
  // Blocks and waits until it receives a bool
  <-shutdown
}

// Implementation for redirecting forbidden status to index.html
type NotFoundRedirectRespWr struct {
  http.ResponseWriter
  status              int
}

func (w *NotFoundRedirectRespWr) WriteHeader(status int) {
  w.status = status
  if status != http.StatusNotFound {
    w.ResponseWriter.WriteHeader(status)
  }
}

func (w *NotFoundRedirectRespWr) Write(p []byte) (int, error) {
  if w.status != http.StatusNotFound {
    return w.ResponseWriter.Write(p)
  }
  return len(p), nil // Lie that we successfully written it
}

func wrapHandler(h http.Handler) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
    nfrw := &NotFoundRedirectRespWr{ResponseWriter: w}
    h.ServeHTTP(nfrw, r)
    if nfrw.status == 404 {
      log.Printf("Redirecting %s to index.html.", r.RequestURI)
      http.Redirect(w, r, "/index.html", http.StatusFound)
    }
  }
}

/************************** JSON Mock API **************************/

// Decodes data from db.json into a Data structure
//
// This is just so we can copy the same format that we are using in json-server now
func resolveJson() Data {
  jsonFile, err := os.Open("db.json")
  if err != nil {
    log.Println("Error marshaling mock data json file.")
  }
  defer jsonFile.Close()
  byteValue, _ := ioutil.ReadAll(jsonFile)
  var data Data

  json.Unmarshal(byteValue, &data)
  return data
}

// Handler functions for retrieving monitor data and search data from different endpoints in the mock API

func liveMonitorsByID(w http.ResponseWriter, r *http.Request) {
  vars := mux.Vars(r)
  id, err := strconv.ParseInt(vars["id"], 10, 64)
  if err != nil {
    log.Printf("%v is not a valid ID for a monitor", vars["id"])
  }

  data := resolveJson().LiveMonitors
  var returnMonitor LiveMonitor
  for _, monitor := range data {
    if monitor.ID == id {
      returnMonitor = monitor
      break
    }
  }
  json.NewEncoder(w).Encode(returnMonitor)
}

func liveMonitors(w http.ResponseWriter, r *http.Request) {
  data := resolveJson()
  json.NewEncoder(w).Encode(data.LiveMonitors)
}

func monitorDataByID(w http.ResponseWriter, r *http.Request) {
  vars := mux.Vars(r)
  id, err := strconv.ParseInt(vars["id"], 10, 64)
  if err != nil {
    log.Printf("%v is not a valid ID for a monitor", vars["id"])
  }

  data := resolveJson().MonitorData
  var returnMonitor MonitorData
  for _, monitor := range data {
    if monitor.ID == id {
      returnMonitor = monitor
      break
    }
  }
  json.NewEncoder(w).Encode(returnMonitor)
}

func searchData(w http.ResponseWriter, r *http.Request) {
  data := resolveJson()
  json.NewEncoder(w).Encode(data.SearchData)
}

type Data struct {
  MonitorData  []MonitorData `json:"monitorData"`
  LiveMonitors []LiveMonitor  `json:"liveMonitors"`
  SearchData   SearchData     `json:"searchData"`
}

type LiveMonitor struct {
  ID                     int64                   `json:"id"`
  Topic                  string                  `json:"topic"`
  QueryBody              string                  `json:"queryBody"`
  QueryDescription       string                  `json:"queryDescription"`
  Live                   bool                    `json:"live"`
  DateCreated            int64                   `json:"dateCreated"`
  Editable               bool                    `json:"editable"`
  Weighting              int64                   `json:"weighting"`
  Template               bool                    `json:"template"`
  ParentID               int64                   `json:"parentId"`
  CacheWindow            int64                   `json:"cacheWindow"`
  AggregateParameter     AggregateParameter      `json:"aggregateParameter"`
  Categories             []Category              `json:"categories"`
  ExternalCalloutObjects []ExternalCalloutObject `json:"externalCalloutObjects"`
  Groups                 []Group                 `json:"groups"`
  Blocks                 bool                    `json:"blocks"`
  SortedCategoryList     []Category              `json:"sortedCategoryList"`
  Store                  bool                    `json:"store"`
}

type Category struct {
  ID          int64  `json:"id"`
  Value       string `json:"value"`
  DateCreated int64  `json:"dateCreated"`
}

type ExternalCalloutObject struct {
  Node         Node              `json:"node"`
  ID           int64             `json:"id"`
  Name         string            `json:"name"`
  URI          URI               `json:"uri"`
  Description  string            `json:"description"`
  PutFields    PutFields         `json:"putFields"`
  ExtraInfo    string            `json:"extraInfo"`
  ExtraInfoMap map[string]string `json:"extraInfoMap"`
}

type Group struct {
  ID          int64      `json:"id"`
  Name        Name       `json:"name"`
  Description string     `json:"description"`
  Enabled     bool       `json:"enabled"`
  ViewAll     bool       `json:"viewAll"`
  SearchHint  SearchHint `json:"searchHint"`
  Parent      *Name      `json:"parent"`
}

type MonitorData struct {
  ID          int64         `json:"id"`
  EsperItems  [][]EsperItem `json:"esperItems"`
  Headers     []Header      `json:"headers"`
  TimeStamp   string        `json:"timeStamp"`
  HashCode    int64         `json:"hashCode"`
  NoDataFound bool          `json:"noDataFound"`
}

type EsperItem struct {
  Key   Header `json:"key"`
  Value string `json:"value"`
}

type SearchData struct {
  BlockHistory    []BlockHistory   `json:"blockHistory"`
  GeolocationData GeolocationData  `json:"geolocationData"`
  CrossReference  []CrossReference `json:"crossReference"`
}

type BlockHistory struct {
  ID                  int64  `json:"id"`
  BlockAction         string `json:"blockAction"`
  Category            string `json:"category"`
  Parameter           string `json:"parameter"`
  CreatedDate         int64  `json:"createdDate"`
  Topic               string `json:"topic"`
  Description         string `json:"description"`
  UnblockRef          *int64 `json:"unblockRef"`
  EvictionTime        int64  `json:"evictionTime"`
  TimeToBlockInMins   int64  `json:"timeToBlockInMins"`
  ParamType           string `json:"paramType"`
  Username            string `json:"username"`
  Weighting           int64  `json:"weighting"`
  ParameterType       string `json:"parameterType"`
  PermanentBlock      bool   `json:"permanentBlock"`
  EvictionTimeInMills int64  `json:"evictionTimeInMills"`
  TimeToBlockInMills  int64  `json:"timeToBlockInMills"`
  IPAsLong            int64  `json:"ipAsLong"`
}

type CrossReference struct {
  UserName     string `json:"User Name"`
  IP           string `json:"IP"`
  SessionToken string `json:"Session Token"`
  UserAgent    string `json:"User Agent"`
  Timestamp    string `json:"Timestamp"`
  LoginStatus  string `json:"Login Status"`
}

type GeolocationData struct {
  City        string `json:"city"`
  Country     string `json:"country"`
  Provider    string `json:"provider"`
  Blocked     bool   `json:"blocked"`
  Whitelisted bool   `json:"whitelisted"`
  Hosting     bool   `json:"hosting"`
}

type AggregateParameter string

const (
  Empty      AggregateParameter = ""
  Hits       AggregateParameter = "hits"
  LoginCount AggregateParameter = "LoginCount"
  NumHits    AggregateParameter = "numHits"
)

type Node string

const (
  EsperStore Node = "esper-store"
  NodeFmREST Node = "fm-rest"
)

type PutFields string

const (
  All                PutFields = "ALL"
  SIPTopicClientsip  PutFields = "sip,topic,clientsip"
  StkTopic           PutFields = "stk,topic"
  TopicXForwardedFor PutFields = "topic,xForwardedFor"
)

type URI string

const (
  RESTBlockwebservice URI = "/rest/blockwebservice"
  RESTEmail           URI = "/rest/email"
  Store               URI = "/store"
  URIFmREST           URI = "fm-rest"
)

type Name string

const (
  AppForensicMonitoringAppPlatform        Name = "App_Forensic Monitoring App Platform"
  AppForensicMonitoringDevTeam            Name = "App_Forensic Monitoring Dev Team"
  AppForensicMonitoringDevelopmentUser    Name = "App_Forensic Monitoring Development User"
  AppForensicMonitoringFraudAnalysis      Name = "App_Forensic Monitoring Fraud Analysis"
  AppForensicMonitoringITOperations       Name = "App_Forensic Monitoring IT Operations"
  AppForensicMonitoringManager            Name = "App_Forensic Monitoring Manager"
  AppForensicMonitoringNetworkEngineering Name = "App_Forensic Monitoring Network Engineering"
  AppForensicMonitoringOTS                Name = "App_Forensic Monitoring OTS"
  AppForensicMonitoringOTSManagers        Name = "App_Forensic Monitoring OTS Managers"
  AppForensicMonitoringPublisherAbuse     Name = "App_Forensic Monitoring Publisher Abuse"
)

type SearchHint string

const (
  OUBet365 SearchHint = "OU=bet365"
)

type Header string

const (
  CompletedLogin   Header = "CompletedLogin"
  IPAddresses      Header = "IPAddresses"
  OpenAccount      Header = "OpenAccount"
  SIP              Header = "sip"
  SessionTokens    Header = "SessionTokens"
  UserAgent        Header = "userAgent"
  UserAgents       Header = "UserAgents"
  Usernames        Header = "Usernames"
  ValidateUsername Header = "ValidateUsername"
)
