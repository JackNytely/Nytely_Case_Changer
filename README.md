# Change Case

This extension allows you to convert the selected text into different case. Supported Cases are:

```css
1. Variable Case - (variable_case)
2. Constant Case- (Constant_Case)
```

## **How to Use it**

\
**1. Select any text from the file, You will see an left side icon for options**\
\
![Alt text](https://i.ibb.co/rZQYspH/img1.png)

> **NOTE**: If you want to change all the occurance of the selected Text, use **Ctrl+Shift+L** or **Cmd+Shift+L**(on Mac) after selection

**2. Click on the icon, it will give the options on change the case and select any option from the dropdown**\
 \
 ![Alt text](https://i.ibb.co/VvYHQ45/img2.png)

**3. The selected text case will gets changed**\
 \
 ![Alt text](https://i.ibb.co/yV0JS8K/img3.png)

> Language Supported: javascript, typescript, javascriptreact, typescriptreact, html, css, less, scss, sass, python, json, markdown, go

## **Customizing the Case Change Options**

You can add only a subset of all supported Case Change options as per your preference and usage, to keep the Case Change list short and more handy.

You need to change the default json (**settings.json**) in your VS Code settings (**Ctrl + ,**).
\
 ![Alt text](https://i.ibb.co/rdvNTfy/setting-Img.png)

```json
Following is the default JSON that support all casing, Change the value to false which you don't want to use.
{
  "variableCase": true,
	"constantCase": true
}
```

## Release Notes

### 0.1.0

Initial release of Change Case

**Enjoy!**
