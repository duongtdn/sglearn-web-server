"use strict"

import React from 'react'
import { hydrate } from "react-dom"
import Catalog from "../components/Catalog"

hydrate(<Catalog data = {window.DATA} />, document.getElementById("root"));