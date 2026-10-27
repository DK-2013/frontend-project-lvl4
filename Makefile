install: install-deps

start:
	heroku local -f Procfile.dev

local:
	npx concurrently -k -n backend,frontend -c blue,green \
		"make start-backend" \
		"make start-frontend"

start-backend:
	npx nodemon --exec npx babel-node server/bin/slack.js

start-frontend:
	npx vite

install-deps:
	npm install

build:
	rm -rf dist
	npm run build

test:
	npm test -s

test-coverage:
	npm test -- --coverage

lint:
	npx eslint . --ext js,jsx

publish:
	npm publish

deploy:
	git push heroku

.PHONY: test
