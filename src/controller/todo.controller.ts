import { NextFunction, Request, Response } from "express";
import { HttpException } from "../errorHandling/httpException";
import { ToDo } from "../model/toDo.model";
import { Types as mongooseTypes } from "mongoose";

function queryGenerator(response: Response, data: any) {
  const query = {
    $and: [
      {
        author: response.locals.user._id,
      },
      {
        softDelete: false,
      },
      ...data,
    ],
  };
  return query;
}
export async function getOneToDo(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const query = queryGenerator(response, [
      {
        _id: request.params.id,
      },
    ]);
    const toDo = await ToDo.findOne(query);
    return response.status(200).send(toDo);
  } catch (e) {
    console.log(e);
    return next(new HttpException(500, "some thing wrong in server"));
  }
}
export async function getAllToDo(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const query = queryGenerator(response, []);
    const userToDo = await ToDo.find(query);
    return response.status(200).send(userToDo);
  } catch (e) {
    console.log(e);
    return next(new HttpException(500, "some thing wrong in server"));
  }
}
export async function getSeveralToDo(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const query = queryGenerator(response, [
      {
        _id: {
          $in: [...request.body.ids],
        },
      },
    ]);
    const toDos = await ToDo.find(query);
    return response.status(200).send(toDos);
  } catch (e) {
    console.log(e);
    return next(new HttpException(500, "some thing wrong in server"));
  }
}
export async function createOneToDo(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const toDo = new ToDo({
      ...request.body,
      userId: response.locals.user._id,
    });
    const result = await toDo.save();
    return response.status(200).send(result);
  } catch (e) {
    console.log(e);
    return next(new HttpException(500, "some thing wrong in server"));
  }
}
export async function createSeveralToDo(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const insertArray = request.body.map((elem: any) => {
      elem.userId = new mongooseTypes.ObjectId(response.locals.user._id);
      return elem;
    });
    const result = await ToDo.insertMany([...insertArray]);
    return response.status(200).send(result);
  } catch (e) {
    console.log(e);
    return next(new HttpException(500, "some thing wrong in server"));
  }
}
export async function searchByFilterToDo(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const data = request.body;
    const filters = [];
    if (data.status)
      filters.push({
        status: data.status,
      });
    if (data.dueDate) {
      if (data.dueDate.specificDate)
        filters.push({
          dueDate: data.dueDate.specificDate,
        });
      else if (data.dueDate.range)
        filters.push({
          dueDate: {
            $gte: data.dueDate.range.from_date,
            $lte: data.dueDate.range.to_date,
          },
        });
    }
    const query = queryGenerator(response, filters);
    const toDos = await ToDo.find(query);
    return response.status(200).send(toDos);
  } catch (e) {
    console.log(e);
    return next(new HttpException(500, "some thing wrong in server"));
  }
}
export async function updateDueDateToDo(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const query = queryGenerator(response, [{ _id: request.params.id }]);
    const result = await ToDo.findOneAndUpdate(query, {
      $set: { dueDate: request.body.dueDate },
    });
    // problem of returning data didnt update
    result.dueDate = request.body.dueDate;
    return response.status(200).send(result);
  } catch (e) {
    console.log(e);
    return next(new HttpException(500, "some thing wrong in server"));
  }
}
export async function updateStatusToDo(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const query = queryGenerator(response, [{ _id: request.params.id }]);
    const result = await ToDo.findOneAndUpdate(query, {
      $set: { status: request.body.status },
    });
    // problem of returning data didnt update
    result.status = request.body.status;
    return response.status(200).send(result);
  } catch (e) {
    console.log(e);
    return next(new HttpException(500, "some thing wrong in server"));
  }
}
export async function softDeleteToDo(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const result = await ToDo.findOneAndUpdate(
      { _id: request.params.id },
      { $set: { softDelete: true } }
    );
    return response.status(200).send("soft deleted");
  } catch (e) {
    console.log(e);
    return next(new HttpException(500, "some thing wrong in server"));
  }
}
export async function hardDeleteToDo(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    await ToDo.findOneAndDelete({ _id: request.params.id });
    return response.status(200).send("hard deleted");
  } catch (e) {
    console.log(e);
    return next(new HttpException(500, "some thing wrong in server"));
  }
}
