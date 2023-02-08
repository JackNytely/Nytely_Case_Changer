# Change Case

This extension allows you to convert the selected text into a Nytely Standardized Case. Supported Cases are:

```css
1. Variable Case - (variable_case)
2. Constant Case - (Constant_Case)
```

## **How to Use it**

\
**1. Select any text from the file, You will see an icon on the left side for options**\
\
![Screenshot 2023-02-08 171921](https://user-images.githubusercontent.com/48361205/217572148-47306801-17ad-4de4-8eba-9e85ce436c7b.png)

> **NOTE**: If you want to change all the occurance of the selected Text, use **Ctrl+Shift+L** or **Cmd+Shift+L**(on Mac) after selection

**2. Click on the icon, it will give the options on change the case and select any option from the dropdown**\
 \
![Screenshot 2023-02-08 171921](https://user-images.githubusercontent.com/48361205/217572620-81ad0d37-36fd-4aa2-8854-f1a508981567.png)

**3. The selected text case will get changed**\
 \
 ![Screenshot 2023-02-08 171921](https://user-images.githubusercontent.com/48361205/217573671-eaaa55fa-906a-4ff1-8244-d05751197cb5.png)

> Language Supported: javascript, typescript, javascriptreact, typescriptreact, html, css, less, scss, sass, python, json, markdown, go

## **Customizing the Nytely Case Changer Options**

You can add only a subset of all supported Nytely Case Changer options as per your preference and usage, to keep the Case Change list short and more handy.

You need to change the default json (**settings.json**) in your VS Code settings (**Ctrl + ,**).
\
![Screenshot 2023-02-08 171921](https://user-images.githubusercontent.com/48361205/217574146-89ab9799-9234-4b5f-a90d-fbbf0606e939.png)

```json
Following is the default JSON that supports all casing, Change the value to false for the case you don't want to use.
{
  "variableCase": true,
  "constantCase": true
}
```

## Release Notes

### 0.1.0

Initial release of Nytely Case Changer

**Enjoy!**
