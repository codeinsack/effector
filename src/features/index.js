import React from "react"

import { Controls, $visibilityFilter } from "./Controls"
import { Form, submitForm } from "./Form"
import { List } from "./List"
import { Todo } from "./Todo"

const ListContainer = props => (
  <List
    {...props}
    $visibilityFilter={$visibilityFilter}
    submiteForm={submitForm}
  />
)

export {
  Controls,
  Form,
  Todo,
  ListContainer as List,
}
