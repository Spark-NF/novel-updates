import { FakeStorageArea } from "./FakeStorageArea";
import { Setting } from "./Setting";
import { Storage } from "./Storage";

describe("Setting", () => {
    it("Returns the default value if none is set", async () => {
        const mock = new FakeStorageArea();
        const storage = new Storage();
        await storage.init(mock, mock);

        const setting = new Setting<number>(storage, "test", 5);

        const val = await setting.get();
        expect(val).toBe(5);
    });

    it("Returns the user's settings if they exist", async () => {
        const mock = new FakeStorageArea();
        const storage = new Storage();
        await storage.init(mock, mock);

        const setting = new Setting<number>(storage, "test", 5);

        await setting.set(7);

        const val = await setting.get();
        expect(val).toBe(7);
    });
});
