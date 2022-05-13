# Vue based simple web framework demo

## Project setup
```
npm install
```

### Mock data

Http request is proxied to static json files located in folder public/mock-data. 
Please refer to file proxy.conf.js for detail logic.
setTimeout is used to simulate http calls. Please remove it from src/business/base/http-request.service.ts.

```
npm run serve
```

If use server backend apis please run below command. Server IP address is configured in src/contants/app-info.ts.

```
npm run serve:server
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Only defined component models, no business data models defined

Since different systems use different data models, all business related models use any instead.


### UI library

To avoid license issue, there is no third-party ui library included.
Basic ui controls are defined under src/controls folder.

### Feature

User related features are implemented which is under first root menu.

### Route guard

Example is under the second root menu.


### Internationalization

Text constants is under src/contants/texts folder. Only implemented English and Chinese simple for example.
