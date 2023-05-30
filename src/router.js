import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Characters from "./components/Characters.vue";
import Comics from "./components/Comics.vue";
import Series from "./components/Series.vue";
import CharacterDetails from "./components/Characterdetail.vue";
import ComicDetails from "./components/Comicdetail.vue";
import SeriesDetails from "./components/Seriesdetail.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/characters/page/:page",
            name: "characters",
            component: Characters,
        },
        {
            path: "/comics/page/:page",
            name: "comics",
            component: Comics,
        },
        {
            path: "/series/page/:page",
            name: "series",
            component: Series,
        },
        {
            path: "/characters/:id",
            name: "CharacterDetails",
            component: CharacterDetails,
        },
        {
            path: "/comics/:id",
            name: "ComicDetails",
            component: ComicDetails,
        },
        {
            path: "/series/:id",
            name: "SeriesDetails",
            component: SeriesDetails,
        },
    ],
    mode: "history",
});
