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

func searchData(w http.ResponseWriter, r *http.Request) {
	log.Printf("GET /search")

	f, err := os.Open("./data/search.json")
	if err != nil {
		log.Println("error opening search.json")
	}
	defer f.Close()

	var data interface{}

	json.NewDecoder(f).Decode(&data)
	json.NewEncoder(w).Encode(data)
}
