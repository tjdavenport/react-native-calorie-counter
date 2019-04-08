const Fat = require('fatsecret');
const express = require('express');

const fat = new Fat('76f5f0d3dd4e4e8a8cf66fdee87fe687', 'fddfd86e99ee41579b9f999fcb5d23db');
const app = express();

app.get('/foods/search', async (req, res, next) => {
  try {
    const results = await fat.method('foods.search', {
      search_expression: req.query.expression,
      page_number: req.query.page,
      max_results: 30
    });
    res.json(results);
  } catch(err) {
    next(err);
  }
});

app.listen(1337, () => {
  console.log('listening on 1337');
});
