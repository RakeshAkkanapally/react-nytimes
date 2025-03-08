import { store } from "../store";
import { articlesApi } from "../../api/articlesApi";

describe("Redux Store", () => {
  it("should configure the store with articlesApi reducer", () => {
    // Dispatch an action to check if middleware processes it
    const action = articlesApi.endpoints.getArticles.initiate({});
    store.dispatch(action);

    // Ensure the query is properly registered in state
    const state = store.getState();
    expect(state[articlesApi.reducerPath].queries).toBeDefined();
    expect(store.getState()).toHaveProperty(articlesApi.reducerPath);
  });
});
