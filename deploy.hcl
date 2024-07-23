job "sms-service" {

  datacenters = ["*"]


  group "servers" {

  
    count = 1

    network {
     
      port "sms-server" {
        static = 7000
      }
     
    }

    
    task "sms-server" {
      driver = "docker"



      config {
        image   = "samkago/sms-service:v1.0.0"
        ports   = ["sms-server"]
      }

      resources {
        cpu    = 800
        memory = 800
      }
    }
  }
}