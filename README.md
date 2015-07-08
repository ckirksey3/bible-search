# BibleSearch
An Amazon Echo app for searching the Bible

### Intent Schema
```
{
  "intents": [
    {
      "intent": "Bible",
      "slots": [
        {
          "name": "Book",
          "type": "LITERAL"
        },
        {
          "name": "Chapter",
          "type": "NUMBER"
        },
        {
          "name": "Verse",
          "type": "NUMBER"
        }
      ]
    }
  ]
}
```
### Sample Utterances
Bible what is {John|Book} chapter {three|Chapter} verse {six|Verse}
