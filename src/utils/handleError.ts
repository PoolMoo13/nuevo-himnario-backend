import { Response } from 'express';

const handleHttpError = (res: Response, message = "Algo sucedió", code = 403): void => {
    res.status(code);
    console.log("🚀 ~ file: handleError.ts:7 ~ handleHttpError ~ res:", res)
    res.send({ error: message });
};

export { handleHttpError };