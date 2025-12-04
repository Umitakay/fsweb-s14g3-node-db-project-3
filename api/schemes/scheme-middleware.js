const { findById } = require("./scheme-model")

/*
  Eğer `scheme_id` veritabanında yoksa:

  durum 404
  {
    "message": "scheme_id <gerçek id> id li şema bulunamadı"
  }
*/
const checkSchemeId = async (req, res, next) => {
  if (!req.params.scheme_id) {
    return res.status(404).send({ message: `scheme_id <gerçek id> id li şema bulunamadı` })
  }
  const scheme = await findById(req.params.scheme_id)
  if (!scheme) {
    return res.status(404).send({ message: `scheme_id ${req.params.scheme_id} id li şema bulunamadı` })
  }

  next();

}

/*
  Eğer `scheme_name` yoksa, boş string ya da string değil:

  durum 400
  {
    "message": "Geçersiz scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  if (req.body.scheme_name === '' ||
    typeof req.body.scheme_name !== 'string'
  ) {
    return res.status(400).send({ message: 'Geçersiz scheme_name' })
  }
  next();
}

/*
  Eğer `instructions` yoksa, boş string yada string değilse, ya da
  eğer `step_number` sayı değilse ya da birden küçükse:

  durum 400
  {
    "message": "Hatalı step"
  }
*/
const validateStep = (req, res, next) => {
  const data = req.body;
  if (!data.instructions ||
    data.instructions === '' ||
    typeof data.instructions !== 'string' ||
    !data.step_number ||
    typeof data.step_number !== 'number' ||
    data.step_number < 1
  ) {
    return res.status(400).send({ message: 'Hatalı step' })
  }
  next();
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
