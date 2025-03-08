import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder;

fetchMock.enableMocks();
