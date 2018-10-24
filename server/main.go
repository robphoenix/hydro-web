// package main serves the index.html entrypoint for the Angular app,
// as well as a mock JSON API.
// The mock API will eventually be removed when it gets replaced by vert.x API
package main

import (
	"encoding/json"
	"flag"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/mux"
)

var (
	index bool
	api   bool
)

func init() {
	flag.BoolVar(&index, "index", true, "serve up the hydro-web index.html file")
	flag.BoolVar(&api, "api", true, "serve up the hydro-web mock JSON API")
	flag.Parse()
}

func main() {
	// Router for Angular client
	staticRouter := mux.NewRouter()
	staticRouter.PathPrefix("/").Handler(wrapHandler(http.FileServer(http.Dir("../dist/hydro-web"))))

	// Router for JSON Mock API
	jsonRouter := mux.NewRouter()
	jsonRouter.HandleFunc("/monitors", monitors).Methods("GET")
	jsonRouter.HandleFunc("/monitors/{id}", monitorsByID).Methods("GET")
	jsonRouter.HandleFunc("/monitors/{id}/data", monitorsData).Methods("GET")
	jsonRouter.HandleFunc("/search", searchData).Methods("GET")

	shutdown := make(chan bool)

	// Serve both routers in different ports
	if index {
		go func() {
			log.Println("Serving static content on 4200")
			err := http.ListenAndServe(":4200", staticRouter)
			if err != nil {
				panic("ListenAndServe: " + err.Error())
			}
			shutdown <- true
		}()
	}
	if api {
		go func() {
			log.Println("Serving json mock data on 3000")
			err := http.ListenAndServe(":3000", &MyServer{jsonRouter})
			if err != nil {
				panic("ListenAndServe: " + err.Error())
			}
			shutdown <- true
		}()
	}
	// Blocks and waits until it receives a bool
	<-shutdown
}

// Implementation for redirecting forbidden status to index.html
type NotFoundRedirectRespWr struct {
	http.ResponseWriter
	status int
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

// Handle CORS and preflight OPTIONS requests
type MyServer struct {
	r *mux.Router
}

func (s *MyServer) ServeHTTP(rw http.ResponseWriter, req *http.Request) {
	if origin := req.Header.Get("Origin"); origin != "" {
		rw.Header().Set("Access-Control-Allow-Origin", origin)
		rw.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		rw.Header().Set("Access-Control-Allow-Headers",
			"Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
	}
	// Stop here if its Preflighted OPTIONS request
	if req.Method == "OPTIONS" {
		return
	}
	// Lets Gorilla work
	s.r.ServeHTTP(rw, req)
}

func monitors(w http.ResponseWriter, r *http.Request) {
	f, err := os.Open("./data/monitors.json")
	if err != nil {
		log.Println("error opening monitors.json")
	}
	defer f.Close()

	var data interface{}

	json.NewDecoder(f).Decode(&data)
	m := data.(map[string]interface{})["monitors"]
	json.NewEncoder(w).Encode(m)
}

func monitorsByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		log.Printf("invalid monitor: %s\n", vars["id"])
	}

	f, err := os.Open("./data/monitors.json")
	if err != nil {
		log.Println("error opening monitors.json")
	}
	defer f.Close()

	var data interface{}

	json.NewDecoder(f).Decode(&data)

	monitors := data.(map[string]interface{})["monitors"]

	var monitor map[string]interface{}
	for _, v := range monitors.([]interface{}) {
		m := v.(map[string]interface{})
		mid := int64(m["id"].(float64))
		if mid == id {
			monitor = m
			break
		}
	}
	json.NewEncoder(w).Encode(monitor)
}

func monitorsData(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		log.Printf("invalid monitor: %s\n", vars["id"])
	}

	f, err := os.Open("./data/monitors-data.json")
	if err != nil {
		log.Println("error opening monitors-data.json")
	}
	defer f.Close()

	var data interface{}

	json.NewDecoder(f).Decode(&data)

	monitors := data.(map[string]interface{})["monitors"]

	var monitor map[string]interface{}
	for _, v := range monitors.([]interface{}) {
		m := v.(map[string]interface{})
		mid := int64(m["id"].(float64))
		if mid == id {
			monitor = m
			break
		}
	}
	json.NewEncoder(w).Encode(monitor)
}

func searchData(w http.ResponseWriter, r *http.Request) {
	f, err := os.Open("./data/search.json")
	if err != nil {
		log.Println("error opening search.json")
	}
	defer f.Close()

	var data interface{}

	json.NewDecoder(f).Decode(&data)
	json.NewEncoder(w).Encode(data)
}
