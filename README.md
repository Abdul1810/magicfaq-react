# @magicdesk/react

A React component for embedding the Magic FAQ widget.

## Installation

```sh
npm install @magicdesk/react
```

or

```sh
yarn add @magicdesk/react
```

## Usage

```jsx
import React from "react";
import { Magicdesk } from "@magicdesk/react";

<Magicdesk uid="your-unique-id" position="top-right" />;
```

## Props

| Prop       | Type   | Description                                                                                                                            |
| ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `uid`      | string | The unique ID of the Magic FAQ widget. This is required for the component to function properly.                                        |
| `position` | string | The position of the widget on the screen. Can be `top-left`, `top-right`, `bottom-left`, or `bottom-right`. Default is `bottom-right`. |

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

For support for the Magic FAQ widget, please visit our [support page](https://abdul1810.vercel.app).
