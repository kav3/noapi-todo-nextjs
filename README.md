# todo list powered by noapi.ir back-end service

- visit [noapi.ir](https://noapi.ir), We offer a free plan for developers.
- [farsi documents](https://noapi.ir/dashboard/docs)

## demo
[online demo](https://kav3.github.io/noapi-todo-nextjs)

## install
1. clone project
2. npm install
3. npm run dev

## noapi.ir in action
``` ts
import Client, { types } from "noapi"
const api = new Client()

api.collection("todo").get().then(todos => {
    // load all todos
})

// post todo
api.collection("todo").post({ title })

// 
api.collection("todo").on(["created", "patched", "deleted"], /* triggered when the database changes */)
```

## need video?
watch another sample in [youtube](https://youtube.com/playlist?list=PLKO3i-B9jolvFI4Dfn9A9MQ1KAgLHMSBB&si=Ss8DwmiivYO7uXM5) (farsi)

## schema
``` json
{
	"_id": {
		"type": "string",
		"default": "$._id"
	},
	"title": {
		"type": "string"
	},
	"done": {
		"type": "boolean"
	},
	"createdAt": {
		"type": "number"
	},
	"updatedAt": {
		"type": "number"
	}
}
```
## permissions
``` json
{
	"*": {
		"get": true,
		"post": {
			"io": [
				"*"
			]
		},
		"patch": {
			"io": [
				"*"
			]
		},
		"delete": {
			"io": [
				"*"
			]
		}
	}
}
```
