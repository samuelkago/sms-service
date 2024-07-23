
build:
	docker build . --no-cache -t samkago/sms-service:v1.0.0

run:
	docker run -p 7000:7000  samkago/sms-service:v1.0.0

push:
	docker push samkago/sms-service:v1.0.0

.PHONY: 