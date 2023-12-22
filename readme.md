<p align="center">
    <img src="https://web.orgbeat.com/android-chrome-512x512.png" width="256" height="256" alt="neome"> 
</p>

<p align="center">
<a href="https://www.npmjs.com/package/@neome/widget"><img src="https://img.shields.io/npm/v/@neome/widget.svg" alt="version"></a>
<a href="https://www.npmjs.com/package/@neome/widget"><img src="https://img.shields.io/npm/dw/@neome/widget.svg" alt="downloads"></a>
<a href="https://www.jsdelivr.com/package/npm/@neome/widget"><img src="https://data.jsdelivr.com/v1/package/npm/@neome/widget/badge" alt="cdn downloads"></a>
</p>

# Neome virtual assistant

Messaging + Excel + Drive = Accessible and affordable automation.

Neome is a conversational automation platform built for enterprises of any size, from one person to ten thousand.

Neome virtual assistant is javascript library which helps you to integrate neome app in your project.

* Demo      : https://www.neome.ai/docs/task-list/try-it

***

# Documentation

## Types

* `NeomeWidgetEmbed`
* `NeomeWidgetFloating`
* `NeomeWidgetDeeplink`

## Methods

The methods are self-explanatory, here's a small overview on all the available methods:

* `embed(config:NeomeWidgetEmbed): () => void`
    * embed neome app in element and return callback which removes the app from
      element.


* `floating(config:NeomeWidgetFloating): () => void`
    * floats the neome app in element and return callback which removes
      the app from element.


* `embedDeeplink(config:NeomeWidgetDeeplink): () => void`
    * embed neome deeplink in element and return callback which removes
      the deeplink from element.

## Config NeomeWidget

This is main config which is super class of NeomeWidgetEmbed and NeomeWidgetFloating.

NeomeWidgetEmbed has same config as NeomeWidget.

| Name                    | Value                 | Description                                                                                                          |
|-------------------------|-----------------------|----------------------------------------------------------------------------------------------------------------------|
| id (required)           | `string`              | `id` is an id of virtual assistant, it must be same of element `id` in which you want to `embed` or `float` the app. |
| hostUrl (required)      | `string`              | if you have on premise plan then use `url` of your server else use `https://web.neome.ai` .                          |
| allowPersonalChat       | `boolean`             | Filter all enterprise groups in app and only allows personal chat like local groups and normal chats .               |
| demoFlag                | `boolean`             | Demo flag prevents editing in app.                                                                                   |
| filterEntId             | `string`              | Filter specific enterprise in app.                                                                                   |
| selectGroupId           | `string`              | Preselect group as the app opens.                                                                                    |
| selectGroupIdBackButton | `boolean`             | Allow to go back if group is pre selected.                                                                           |
| allowProduction         | `boolean`             | Allow to view production in app.                                                                                     |
| allowStore              | `boolean`             | Allow to view store in app.                                                                                          |
| allowStudio             | `boolean`             | Allow to view studio in app.                                                                                         |
| allowTerminal           | `boolean`             | Allow to view terminal in app.                                                                                       |
| userCredentials         | `IWidgetCredential[]` | Array of `IWidgetCredential`, it will select random credentials and will auto sign in in the app                     |

## Config NeomeWidgetFloating

| Name                  | Value     | Description                                                                                                          |
|-----------------------|-----------|----------------------------------------------------------------------------------------------------------------------|
| id (required)         | `string`  | `id` is an id of virtual assistant, it must be same of element `id` in which you want to `embed` or `float` the app. |
| disableBadgeCount     | `boolean` | Disable badge count number in floating button                                                                        |
| floatingButtonIconSrc | `string`  | Choose any image as an icon for floating button.                                                                     |
| widgetHeight          | `number`  | Height of virtual assistant popup (default 650).                                                                     |
| widgetWidth           | `number`  | Width of virtual assistant popup (default 350).                                                                      |

## Config NeomeWidgetDeeplink

| Name               | Value                 | Description                                                                                                    |
|--------------------|-----------------------|----------------------------------------------------------------------------------------------------------------|
| id (required)      | `string`              | `id` is an id of virtual assistant, it must be same of element `id` in which you want to `embed` the deeplink. |
| hostUrl (required) | `string`              | `url` of deeplink you want to embed.                                                                           |
| userCredentials    | `IWidgetCredential[]` | Array of `IWidgetCredential`, it will select random credentials and will auto sign in in the app               |

## Installation

There are two ways of neome virtual assistant :

(1) Direct react component

(2) Insert script on your website

## (1) Direct react component

`yarn add @neome/widget`

OR

`npm i @neome/widget`

### Embedding neome in element

```tsx
import {embed, NeomeWidgetEmbed} from "@neome/widget";
import {useEffect} from "react";

function EmbedNeome()
{
  const id = "neomeEmbed"
  useEffect(() =>
  {
    const remove = embed({
      id: id,
      hostUrl: "https://web.neome.ai",
      allowPersonalChat: true,
      allowTerminal: true,
      selectGroupId: "groupId",
      selectGroupIdBackButton: true,
      filterEntId: "entId"
    } as NeomeWidgetEmbed)

    return () =>
    {
      remove();
    }
  }, [])

  return (
    <div
      id={id}
      style={{
        width: "300px",
        height: "600px",
      }}
    >
    </div>
  );
}

// Points to remember 👇🏻
/* 
  👉🏻  config id and element in which you want to render must be same
  👉🏻  Don't forget to include width and height in which element you are embeding
      minimun width is 280 and minimum height is 400 to render 
  👉🏻  "embed" function returns a callback which removes the app from element (optional)
*/ 
```

### Floating neome in element

```tsx
import {floating, NeomeWidgetFloating, IWidgetCredential} from "@neome/widget";
import {useEffect} from "react";

function FloatingNeome()
{
  const id = "neomeFloating"
  useEffect(() =>
  {
    const remove = floating({
      id: id,
      hostUrl: "https://web.neome.ai",
      allowStudio: true,
      disableBadgeCount: true,
      widgetWidth: 400,
      widgetHeight: 700,
      userCredentials: [
        {
          handle: "anyhandle@email.com",
          password: "password"
        }
      ] as IWidgetCredential[]
    } as NeomeWidgetFloating)

    return () =>
    {
      remove();
    }
  }, [])

  return (
    <div
      id={id}

      // position element however want to display anywhere in screen
      // here the virtual assistant is positioned to bottom right
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px"
      }}
    >
    </div>
  );
}

// Points to remember 👇🏻
/* 
  👉🏻  config id and element in which you want to render must be same
  👉🏻  "floating" function returns a callback which removes the app from element (optional)
*/ 
```

### Embedding deeplink in element

```tsx
import {embedDeeplink, NeomeWidgetDeeplink} from "@neome/widget";
import {useEffect} from "react";

function EmebdDeeplink()
{
  const id = "neomeEmbedDeeplink"
  const hostUrl = "url_of_deeplink" // url of deeplink;

  useEffect(() =>
  {
    const remove = embedDeeplink({
      id: id,
      hostUrl: hostUrl
    } as NeomeWidgetDeeplink)

    return () =>
    {
      remove();
    }
  }, [])

  return (
    <div
      id={id}
      style={{
        width: "300px",
        height: "600px",
      }}
    >
    </div>
  );
}

// Points to remember 👇🏻
/* 
  👉🏻  config id and element in which you want to render must be same
*/ 
```

## (2) Insert script on your website

Add `https://cdn.jsdelivr.net/npm/@neome/widget/dist/cdn.js` in script tag, and you can use all the methods in
your project.

```html
<!doctype html>
<html lang="en">
  <head>
    <title>Using CDN</title>

    <!-- Add CDN script  -->
    <script
      src="https://cdn.jsdelivr.net/npm/@neome/widget/dist/cdn.js"
      type="module"
    >
    </script>

    <script type="module">

      <!-- Here you can use embed, floating and embedDeeplink function -->
      embed({
        id: "neomeEmbed",
        allowPersonalChat: true,
        allowTerminal: true,
        selectGroupId: "groupId",
        filterEntId: "entId"
      });
    </script>
  </head>
  <body>
    <div
      id="neomeEmbed"
      style="width:1000px;height: 650px;"
    >
    </div>
  </body>
  <!--  
    Points to remember 👇🏻
    👉🏻 config id and element in which you want to render must be same
  -->
</html>
```

# License

MIT License

Copyright (c) 2023 Neome

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
