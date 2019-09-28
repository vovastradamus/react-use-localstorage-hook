# react-use-localstorage-hook [![npm version](https://badge.fury.io/js/react-use-localstorage-hook.svg)](https://badge.fury.io/js/react-use-localstorage-hook)
Simple localstorage hook with sharing states across components, tabs, windows

```
npm i react-use-localstorage-hook
```

Example of code:
``` javascript
import useLocalStorage from "react-use-localstorage-hook";

function Input() {
  const [value, setValue] = useLocalStorage("test:input", "input text");

  return (
    <>
      <div>{value}</div>
      <input
        value={value}
        onInput={({ target: { value } }) => setValue(value)}
      />
    </>
  );
}
```

Advanced example in this demo:  
[![Edit React useLocalStorage hook](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-uselocalstorage-hook-h7oxj?fontsize=14)
