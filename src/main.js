import MenuComponent, {MenuItem} from "@/components/menu.js";
import InfoWrapperComponent from "@/components/info-wrapper.js";
import LoadMessageComponent from "@/components/load-message.js";
import ErrorMessageComponent from "@/components/error-message.js";
import StatisticComponent from "@/components/statistics.js";

import TripController from "@/controllers/board.js";
import FilterController from "@/controllers/filter.js";
import CostController from "@/controllers/cost.js";
import InfoController from "@/controllers/info.js";

import {render, remove, RenderPosition} from "@/utils/render.js";

import API from "@/api/index.js";
import Provider from "@/api/provider.js";
import ProviderOffer from "@/api/provider-offer.js";
import ProviderDestination from "@/api/provider-destination.js";
import Store from "@/api/store.js";

import PointsModel from "@/models/points.js";
import OffersModel from "@/models/offers.js";
import DestinationModel from "@/models/destinations.js";

const AUTHORIZATION = `Basic 1f42AOQm124Ck16zo2`;
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
const infoWrapperElement = infoWrapperComponent.getElement();

const infoController = new InfoController(infoWrapperElement, pointsModel);
const costController = new CostController(infoWrapperElement, pointsModel);

infoController.render();
costController.render();

const siteControlsElement = siteMainElement.querySelector(`.trip-controls`);
const siteMenuElement = siteControlsElement.querySelector(`h2:nth-child(1)`);
const siteFilterElement = siteControlsElement.querySelector(`h2:nth-child(2)`);

const menuComponent = new MenuComponent();
render(siteMenuElement, menuComponent, RenderPosition.AFTEREND);

const filterController = new FilterController(siteFilterElement, pointsModel);
filterController.render();

const siteBoardElement = document.querySelector(`.trip-events`);

const loadMessageComponent = new LoadMessageComponent();
render(siteBoardElement, loadMessageComponent, RenderPosition.AFTEREND);

const boardController = new TripController(siteBoardElement, pointsModel, offersModel, destinationModel, apiWithProvider);

const statisticsComponent = new StatisticComponent(pointsModel);
render(siteBoardElement, statisticsComponent, RenderPosition.AFTEREND);
statisticsComponent.hide();

menuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_EVENT:
      menuComponent.setActiveItem(MenuItem.NEW_EVENT);
      boardController.showBlock();
      statisticsComponent.hide();
      boardController.createEvent();
      break;
    case MenuItem.STATISTICS:
      menuComponent.setActiveItem(MenuItem.STATISTICS);
      boardController.hideBlock();
      statisticsComponent.show();
      break;
    case MenuItem.EVENTS:
      menuComponent.setActiveItem(MenuItem.EVENTS);
      statisticsComponent.hide();
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
.catch(() => {
  remove(loadMessageComponent);
  const errorMessageComponent = new ErrorMessageComponent();
  render(siteBoardElement, errorMessageComponent, RenderPosition.AFTEREND);
});


window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
    }).catch(() => {
    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
