import {Menu as MenuComponent, MenuItem} from "@/components/menu.js";
import {InfoWrapper as InfoWrapperComponent} from "@/components/infoWrapper.js";
import {render, remove, RenderPosition} from "@/utils/render.js";
import {TripController} from "@/controllers/board.js";
import {FilterController} from "@/controllers/filter.js";
import {CostController} from "@/controllers/cost.js";
import {InfoController} from "@/controllers/info.js";
import {Points as PointsModel} from "@/models/points.js";
import {LoadMessage as LoadMessageComponent} from "@/components/loadMessage.js";
import {Statistic as StatisticComponent} from "@/components/statistics.js";
import API from "@/api/index.js";
import Provider from "@/api/provider.js";

import ProviderOffer from "@/api/providerOffer.js";
import ProviderDestination from "@/api/providerDestination.js";

import Store from "@/api/store.js";
import OffersModel from "@/models/offers.js";
import DestinationModel from "@/models/destinations.js";


const AUTHORIZATION = `Basic fdsOQml21Ck16zo2`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_PREFIX_OFFER = `offer-localstorage`;
const STORE_PREFIX_DESTINATION = `ofestination-localstorage`;

const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;
const STORE_NAME_OFFER = `${STORE_PREFIX_OFFER}-${STORE_VER}`;
const STORE_NAME_DESTINATION = `${STORE_PREFIX_DESTINATION}-${STORE_VER}`;

const api = new API(END_POINT, AUTHORIZATION);
const storeOffer = new Store(STORE_NAME_OFFER, window.localStorage);
const storeDestination = new Store(STORE_NAME_DESTINATION, window.localStorage);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProviderOffer = new ProviderOffer(api, storeOffer);
const apiWithProviderDestination = new ProviderDestination(api, storeDestination);
const apiWithProvider = new Provider(api, store);

const offersModel = new OffersModel();
const destinationModel = new DestinationModel();
const pointsModel = new PointsModel();

const siteMainElement = document.querySelector(`.trip-main`);
const infoWrapperComponent = new InfoWrapperComponent();

render(siteMainElement, infoWrapperComponent, RenderPosition.AFTERBEGIN);

const infoWrapper = document.querySelector(`.trip-info`);

const infoController = new InfoController(infoWrapper, pointsModel);
const costController = new CostController(infoWrapper, pointsModel);

infoController.render();
costController.render();

const siteControls = siteMainElement.querySelector(`.trip-controls`);
const siteMenu = siteControls.querySelector(`h2:nth-child(1)`);
const siteFilter = siteControls.querySelector(`h2:nth-child(2)`);

const menuComponent = new MenuComponent();

render(siteMenu, menuComponent, RenderPosition.AFTEREND);
const filterController = new FilterController(siteFilter, pointsModel);
filterController.render();

const siteBoardEvents = document.querySelector(`.trip-events`);

const loadMessageComponent = new LoadMessageComponent();
render(siteBoardEvents, loadMessageComponent, RenderPosition.AFTEREND);

const boardController = new TripController(siteBoardEvents, pointsModel, offersModel, destinationModel, apiWithProvider);

const statistics = new StatisticComponent(pointsModel);
render(siteBoardEvents, statistics, RenderPosition.AFTEREND);
statistics.hide();

menuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_EVENT:
      menuComponent.setActiveItem(MenuItem.NEW_EVENT);
      boardController.showBlock();
      statistics.hide();
      boardController.createEvent();
      break;
    case MenuItem.STATISTICS:
      menuComponent.setActiveItem(MenuItem.STATISTICS);
      boardController.hideBlock();
      statistics.show();
      break;
    case MenuItem.EVENTS:
      menuComponent.setActiveItem(MenuItem.EVENTS);
      statistics.hide();
      boardController.showBlock();
  }
});

Promise.all([apiWithProviderOffer.getOffers(), apiWithProviderDestination.getDestinations(), apiWithProvider.getPoints()])
.then(([offers, destinations, events]) => {
  offersModel.setOffers(offers);
  destinationModel.setDestinations(destinations);
  pointsModel.setPoints(events);
  boardController.render();
  remove(loadMessageComponent);

})
.catch();


window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      // Действие, в случае успешной регистрации ServiceWorker
    }).catch(() => {
      // Действие, в случае ошибки при регистрации ServiceWorker
    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
