import React from "react"
import { createComponent } from "effector-react"

import { $input, changeInput, submitForm } from "./model"

function handleChange(e) {
  changeInput(e.target.value)
}

function handleSubmit(e) {
  e.preventDefault()
  submitForm($input.getState())
}

export const Form = createComponent($input, (props, input) => (
  <form onSubmit={handleSubmit}>
    <input onChange={handleChange} value={input} />
    <button className="add-todo" type="submit">
      Add Todo
    </button>
  </form>
))
