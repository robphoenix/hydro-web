// package main serves the index.html entrypoint for the Angular app,
// as well as a mock JSON API.
// The mock API will eventually be removed when it gets replaced by vert.x API
package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	staticRouter := mux.NewRouter()
	staticRouter.PathPrefix("/").Handler(wrapHandler(http.FileServer(http.Dir("../dist/hydro-web"))))

	shutdown := make(chan bool)

	go func() {
		log.Println("Serving static content on 4200")
		err := http.ListenAndServe(":4200", staticRouter)
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
