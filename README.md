# Instruction for SystemCommand Sample App


## Introduction : 

This application is showcasing interface for basic system control of a Tizen 6.5 device.



## Steps :  

1) Install application via Tizen studio debug mode, Usb stick or http.
2) Start application, each command is assigned to a remote key. Press according to the instructions of GUI.


## Result :  

Device will behave accordingly to the command send via API.


## Requirements:

Tizen 6.5 device running latest firmware.
Aplication needs tobe signed with partner level signature.

```html
<script type='text/javascript' language='javascript' src='$WEBAPIS/webapis/webapis.js'></script>
```

## Privileges and metadata:

```xml
<tizen:privilege name="http://tizen.org/privilege/tv.inputdevice"/>
<tizen:privilege name="http://developer.samsung.com/privilege/productinfo"/>
<tizen:privilege name="http://developer.samsung.com/privilege/systemcontrol"/>

```
## File structure

```
SystemCommand/ - UDPStreaming sample app root folder
│
│
├── css/ - styles used in the application
│   │
│   └── style.css - style for application's template
│
├── js/ - scripts used in the application
│   │
│   ├── main.js - main application script
│
├── config.xml - application's configuration file
├── index.html - main document
└── README.md - this file
```

## Copyright and License:

**Copyright 2019 Samsung Electronics, Inc.**

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
