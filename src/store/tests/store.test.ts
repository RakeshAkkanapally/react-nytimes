import { store } from "../store";
import { articlesApi } from "../../api/articlesApi";

describe("Redux Store", () => {
  it("should configure the store with articlesApi reducer", () => {
    const action = articlesApi.endpoints.getArticles.initiate({});
    store.dispatch(action);

    const state = store.getState();
    expect(state[articlesApi.reducerPath].queries).toBeDefined();
    expect(store.getState()).toHaveProperty(articlesApi.reducerPath);
  });
});
