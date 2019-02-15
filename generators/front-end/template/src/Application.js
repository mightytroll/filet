import Backbone from "backbone";
import Marionette from "backbone.marionette";
import { IndexController } from "./controllers/IndexController";

export const Application = Marionette.Application.extend({
    region: "#app-viewport",
    controllers: [],

    initialize(options) {
        Marionette.View.setRenderer((template, data) => template.render(data));

        this.controllers = [
            new IndexController({ app: this })
        ];
    },

    onStart() {
        let preloadData = [];

        /**
         * Preload all `global` models and collections here. e.g.
         *
         * preloadData.push(this.user.fetch());
         * preloadData.push(this.
         * experiences.fetch());
         */

        Backbone.$.when.apply(Backbone.$, preloadData).then(() => {
            // Data preload complete. Starting...
            Backbone.history.start();
        });
    }
});
