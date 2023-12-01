<p align="center">
    <img src="https://web.orgbeat.com/android-chrome-512x512.png" width="256" height="256" alt="neome"> 
</p>

<p align="center">
<a href="https://www.npmjs.com/package/ua-parser-js"><img src="https://img.shields.io/npm/v/@brijeshdobariya/widget.svg" alt="version"></a>
<a href="https://www.npmjs.com/package/ua-parser-js"><img src="https://img.shields.io/npm/dw/@brijeshdobariya/widget.svg" alt="downloads"></a>
<a href="https://www.jsdelivr.com/package/npm/ua-parser-js"><img src="https://data.jsdelivr.com/v1/package/npm/@brijeshdobariya/widget/badge" alt="cdn downloads"></a>
</p>

# Neome Widget

Messaging + Excel + Drive = Accessible and affordable automation.

Neome is a conversational automation platform built for enterprises of any size, from one person to ten thousand.

Neome widget is javascript library which helps you to integrate neome app in your project.

* Demo      : https://www.orgbeat.com/docs/task-list/try-it

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

| Name              | Value                 | Description                                                                                               |
|-------------------|-----------------------|-----------------------------------------------------------------------------------------------------------|
| id (required)     | `string`              | `id` is an id of widget, it must be same of element `id` in which you want to `embed` or `float` the app. |
| allowPersonalChat | `boolean`             | Filter all enterprise groups in app and only allows personal chat like local groups and normal chats .    |
| demoFlag          | `boolean`             | Demo flag prevents editing in app.                                                                        |
| filterEntId       | `string`              | Filter specific enterprise in app.                                                                        |
| selectGroupId     | `string`              | Preselect group in as the app opens.                                                                      |
| showProduction    | `boolean`             | Allow to view production in app.                                                                          |
| showStore         | `boolean`             | Allow to view store in app.                                                                               |
| showStudio        | `boolean`             | Allow to view studio in app.                                                                              |
| showTerminal      | `boolean`             | Allow to view terminal in app.                                                                            |
| userCredentials   | `IWidgetCredential[]` | Array of `IWidgetCredential`, it will select random credentials and will auto sign in in the app          |

## Config NeomeWidgetFloating

| Name                  | Value     | Description                                                                                               |
|-----------------------|-----------|-----------------------------------------------------------------------------------------------------------|
| id (required)         | `string`  | `id` is an id of widget, it must be same of element `id` in which you want to `embed` or `float` the app. |
| disableBadgeCount     | `boolean` | Disable badge count number in floating button                                                             |
| floatingButtonIconSrc | `string`  | Choose any image as an icon for floating button.                                                          |
| widgetHeight          | `number`  | Height of widget popup (default 650).                                                                     |
| widgetWidth           | `number`  | Width of widget popup (default 350).                                                                      |

## Config NeomeWidgetDeeplink

| Name           | Value    | Description                                                                                                   |
|----------------|----------|---------------------------------------------------------------------------------------------------------------|
| id (required)  | `string` | `id` is an id of widget, it must be same of element `id` in which you want to `embed` or `float` the app.     |
| src (required) | `string` | `src` of deeplink you want to embed, it must be same of element `id` in which you want to embed the deeplink. |

## Installation

There are two ways of installing :

(1) Using package

(2) Using CDN

## (1) Using package

`yarn add @brijeshdobariya/widget`

OR

`npm i @brijeshdobariya/widget`

### Embedding neome in element

```tsx
import {embed, NeomeWidgetEmbed} from "@brijeshdobariya/widget";
import {useEffect} from "react";

function EmbedNeome()
{
  const id = "neomeEmbed"
  useEffect(() =>
  {
    const remove = embed({
      id: id,
      allowPersonalChat: true,
      showTerminal: true,
      selectGroupId: "groupId",
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
import {floating, NeomeWidgetFloating, IWidgetCredential} from "@brijeshdobariya/widget";
import {useEffect} from "react";

function FloatingNeome()
{
  const id = "neomeFloating"
  useEffect(() =>
  {
    const remove = floating({
      id: id,
      showStudio: true,
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
      // here the widget is positioned to bottom right
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
import {embedDeeplink, NeomeWidgetDeeplink} from "@brijeshdobariya/widget";
import {useEffect} from "react";

function EmebdDeeplink()
{
  const id = "neomeEmbedDeeplink"
  const src = "src_of_deeplink" // src of deeplink;

  useEffect(() =>
  {
    const remove = embedDeeplink({
      id: id,
      src: src
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

## (2) Using CDN

Add `https://cdn.jsdelivr.net/npm/@brijeshdobariya/widget/dist/cdn.js` in script tag, and you can use all the methods in
your project.

```html
<!doctype html>
<html lang="en">
  <head>
    <title>Using CDN</title>

    <!-- Add CDN script  -->
    <script
      src="https://cdn.jsdelivr.net/npm/@brijeshdobariya/widget/dist/cdn.js"
      type="module"
    >
    </script>

    <script type="module">

      <!-- Here you can use embed, floating and embedDeeplink function -->
      embed({
        id: "neomeEmbed",
        allowPersonalChat: true,
        showTerminal: true,
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
