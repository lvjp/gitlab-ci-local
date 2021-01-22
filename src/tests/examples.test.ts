import * as defaultCmd from "../default_cmd";
import * as mockProcess from "jest-mock-process";

test('docker-compose example', async() => {
    jest.setTimeout(45000);

    const mockProcessStdout = mockProcess.mockProcessStdout();
    const mockProcessStderr = mockProcess.mockProcessStderr();
    const mockProcessExit = mockProcess.mockProcessExit();

    await defaultCmd.handler({
        cwd: 'examples/docker-compose-nodejs',
    });
    expect(mockProcessExit).toBeCalledTimes(0);
    expect(mockProcessStderr).toHaveBeenNthCalledWith(3, "Dependencies not up-to-date\n")
    expect(mockProcessStdout).toHaveBeenNthCalledWith(52, "[94mdocker-compose-up[39m environment: { name: [1mlocal[22m, url: [1mhttp://localhost:8891[22m }\n");

    mockProcessStdout.mockRestore();
    mockProcessStderr.mockRestore();
    mockProcessExit.mockRestore();
});
