import {Info as InfoComponent} from "@/components/info.js";
import {Cost as CostComponent} from "@/components/cost.js";
import {Menu as MenuComponent} from "@/components/menu.js";
import {Filter as FilterComponent} from "@/components/filter.js";
import {render, RenderPosition} from "@/utils/render.js";
import {TripController} from "@/controllers/board.js";
import {generateTripPoints} from "@/mock/eventData.js";

const POINT_COUNT = 5;
const tripList = generateTripPoints(POINT_COUNT);
const siteMainElement = document.querySelector(`.trip-main`);

render(siteMainElement, new InfoComponent(tripList), RenderPosition.AFTERBEGIN);

const siteInfoTrip = siteMainElement.querySelector(`.trip-info`);

render(siteInfoTrip, new CostComponent(tripList), RenderPosition.BEFOREEND);

const siteControls = siteMainElement.querySelector(`.trip-controls`);
const siteMenu = siteControls.querySelector(`h2:nth-child(1)`);
const siteFilter = siteControls.querySelector(`h2:nth-child(2)`);

render(siteMenu, new MenuComponent(), RenderPosition.AFTEREND);
render(siteFilter, new FilterComponent(), RenderPosition.AFTEREND);

const siteBoardEvents = document.querySelector(`.trip-events`);
const boardController = new TripController(siteBoardEvents);

boardController.render(tripList);
