import Backbone from "backbone";
import { Application } from "./Application";

Backbone.$(document).ready(() => {
    let application = new Application();

    application.start();
});
