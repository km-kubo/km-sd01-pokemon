import { Router } from "express";
import { findTrainers, upsertTrainer, deleteTrainer, getTrainer } from "~/server/utils/trainer";
import { findPokemon } from "~/server/utils/pokemon";

const router = Router();

router.get("/hello", (_req, res) => {
  res.send("Hello World");
});

/** トレーナー名の一覧の取得 */
router.get("/trainers", async (_req, res, next) => {
  try {
    const trainers = await findTrainers();
    // TODO: 期待するレスポンスボディに変更する
    const trainers2 = trainers.map(obj => {   //add 
      console.log(obj.Key);                              //add 
      return obj.Key.split('.')[0];                       //add 
    })
    res.send(trainers2);
  } catch (err) {
    next(err);
  }
});

/** トレーナーの追加 */
router.post("/trainer", async (req, res, next) => {
  try {
    // TODO: リクエストボディにトレーナー名が含まれていなければ400を返す
    // TODO: すでにトレーナー（S3 オブジェクト）が存在していれば409を返す
    console.log(req.body.name, req.body);
    if (!req.body.name){
      res.status(400).send(result);
    }
    const result = await upsertTrainer(req.body.name, req.body);
    res.status(result["$metadata"].httpStatusCode).send(result);
  } catch (err) {
    next(err);
  }
});

/** トレーナーの取得 */
// TODO: トレーナーを取得する API エンドポイントの実装
router.get("/trainer/:trainerName", async (req, res, next) => {
  try {
    console.log("getTrainer");
    const { trainerName } = req.params;
    // TODO: トレーナーが存在していなければ404を返す
    const result = await getTrainer(trainerName);
    res.send(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
});
/** トレーナーの更新 */
router.post("/trainer/:trainerName", async (req, res, next) => {
  try {
    const { trainerName } = req.params;
    // TODO: トレーナーが存在していなければ404を返す
    const result = await upsertTrainer(trainerName, req.body);
    res.status(result["$metadata"].httpStatusCode).send(result);
  } catch (err) {
    next(err);
  }
});

/** トレーナーの削除 */
// TODO: トレーナーを削除する API エンドポイントの実装
router.delete("/trainer/:trainerName", async (req, res, next) => {
  try {
    const { trainerName } = req.params;
    console.log("trainerName",trainerName);
    // TODO: トレーナーが存在していなければ404を返す
    const result = await deleteTrainer(trainerName, req.body);
    res.status(result["$metadata"].httpStatusCode).send(result);
  } catch (err) {
    next(err);
  }
});

/** ポケモンの追加 */
router.put(
  "/trainer/:trainerName/pokemon/:pokemonName",
  async (req, res, next) => {
    try {
      console.log("sss");
      const { trainerName, pokemonName } = req.params;
      const pokemon = await findPokemon(pokemonName);
      // TODO: 削除系 API エンドポイントを利用しないかぎりポケモンは保持する
      const result = await upsertTrainer(trainerName, { pokemons: [pokemon] });
      res.status(result["$metadata"].httpStatusCode).send(result);
    } catch (err) {
      next(err);
    }
  }
);

/** ポケモンの削除 */
// TODO: ポケモンを削除する API エンドポイントの実装

export default router;
