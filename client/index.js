import ReactDOM from "react-dom";
// import { Router, Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import React, { Component } from "react";

import styles from "./index.scss";
import App from "./components/App";

ReactDOM.render(
      (<Router>
				<App />
      </Router>),
  document.getElementById('root')
)

console.log('index begin');



/***********

{User}
 - name: str
 - pass: str?
 - stars: int
 - ownedSamples[]
 - solvedSamples[]

{ Sample (Task) }
 - ownerId: objectId
 - regex[userId -> str]  --- правильный  паттерн, придуманный пользователем (решил, если присутствует в этом списке)
  - отображение:
    - editablePattern:str
    - isPatternValid: boolean
 - stars: int  --- сложность задания
 - regexLenLimit: int  --- ограничение на длину регулярки (задание)
 - cases[] --- проверочные примеры
   - хранение: { str: str, mustMatch: true/false/undefined }  --- null для mustMatch означает по умолчанию от паттерна
   - отображение (решение)  +: { isOkMatch:true/false/undefined }
   - отображение (редактор) +: { edit:true, onRemoveCallback:func }

************/