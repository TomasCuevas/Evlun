# User API

### **_/api/user/create_** **method: POST**

`request body`

```
- name: String
- username: String
- email: String
- password: String
```

`response data`

```
- ok: Boolean
- msg: String
- token: JsonWebToken
- user: Object
```

### **_/api/user_** **method: GET**

`request query`

```
- username: String
```

`response data`

```
- ok: Boolean
- user: Object
```

### **_/api/search_** **method: GET**

`request query`

```
- search: String
```

`response data`

```
- ok: Boolean
- users: Array
```

### **_/api/user/update_** **method: PUT**

`request header`

```
- x-token: JsonWebToken
```

`request body`

```
- country?, email?, name?, phone?, username?, gender?, oldPassword? & newPassword?: Object,
```

`response data`

```
- ok: Boolean
- msg: String
```

### **_/api/user/follow_** **method: POST**

`request header`

```
- x-token: JsonWebToken
```

`request query`

```
- id: MongoID
```

`response data`

```
- ok: Boolean
- msg: String
- updateProfileUser: Array
- updateAuthUser: Array
```

### **_/api/user/unfollow_** **method: POST**

`request header`

```
- x-token: JsonWebToken
```

`request query`

```
- id: MongoID
```

`response data`

```
- ok: Boolean
- msg: String
- updateProfileUser: Array
- updateAuthUser: Array
```

### **_/api/user/deactive_** **method: DELETE**

`request header`

```
- x-token: JsonWebToken
```

### **_/api/user/reactivate_** **method: PUT**

`request body`

```
- email: String
- password: String
```

# Auth API

### **_/api/auth/login_** **method: POST**

`request body`

```
- email: String
- password: String
```

`response data`

```
- ok: Boolean
- msg: String
- token: JsonWebToken
- user: Object
```

### **_/api/auth/refresh_** **method: GET**

`request header`

```
- x-token: JsonWebToken
```

`response data`

```
- ok: Boolean
- msg: String
- token: JsonWebToken
- user: Object
```

# Post API

### **_/api/post/create_** **method: POST**

`request header`

```
- x-token: JsonWebToken
```

`request body`

```
- content: String
```

`response data`

```
- ok: Boolean
- msg: String
- post: Object
```

### **_/api/post_** **method: GET**

`request query`

```
- id: MongoID
```

`response data`

```
- ok: Boolean
- post: Array
```

### **_/api/post/user_** **method: GET**

`request query`

```
- id: MongoID
```

`response data`

```
- ok: Boolean
- posts: Array
```

### **_/api/post/all_** **method: GET**

`request header`

```
- x-token: JsonWebToken
```

`response data`

```
- ok: Boolean
- msg: String
- posts: Array
```

### **_/api/post/followings_** **method: GET**

`request header`

```
- x-token: JsonWebToken
```

`response data`

```
- ok: Boolean
- msg: String
- posts: Array
```

### **_/api/post/saved_** **method: GET**

`request header`

```
- x-token: JsonWebToken
```

`response data`

```
- ok: Boolean
- posts: Array
```

### **_/api/post/savedlist_** **method: GET**

`request header`

```
- x-token: JsonWebToken
```

`response data`

```
- ok: Boolean
- savedPostsList: Array
```

### **_/api/post/like_** **method: POST**

`request header`

```
- x-token: JsonWebToken
```

`request query`

```
- id: MongoID
```

`response data`

```
- ok: Boolean
```

### **_/api/post/save_** **method: POST**

`request header`

```
- x-token: JsonWebToken
```

`request query`

```
- id: MongoID
```

`response data`

```
- ok: Boolean
```

### **_/api/post/report_** **method: POST**

`request header`

```
- x-token: JsonWebToken
```

`request query`

```
- id: MongoID
```

`response data`

```
- ok: Boolean
```

### **_/api/post/delete_** **method: DELETE**

`request header`

```
- x-token: JsonWebToken
```

`request query`

```
- id: MongoID
```

`response data`

```
- ok: Boolean
```

# Comment API

### **_/api/comment/create_** **method: POST**

`request header`

```
- x-token: JsonWebToken
```

`request query`

```
- id: MongoID
```

`request body`

```
- content: String
```

`response data`

```
- ok: Boolean
- msg: String
- comment: Object
```

### **_/api/comment_** **method: GET**

`request query`

```
- id: MongoID
```

`response data`

```
- ok: Boolean
- comments: Object
```

### **_/api/comment/like_** **method: POST**

`request header`

```
- x-token: JsonWebToken
```

`request query`

```
- id: MongoID
```

`request body`

```
- content: String
```

`response data`

```
- ok: Boolean
- comment: Object
```

### **_/api/comment/report_** **method: POST**

`request header`

```
- x-token: JsonWebToken
```

`request query`

```
- id: MongoID
```

`response data`

```
- ok: Boolean
```

### **_/api/comment/delete_** **method: POST**

`request header`

```
- x-token: JsonWebToken
```

`request query`

```
- id: MongoID
```

`response data`

```
- ok: Boolean
```
