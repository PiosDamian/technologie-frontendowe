module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    /**
    * używam proxy tak, aby aplikacja łączyła się w ten sam sposób z backend deweloperskim i produkcyjnym
    * unikam dzięki temu konieczności konfigurowania CORS, nie mam problemu ze zmianą protokołu (jeżeli na przykład backend stoi na https),
    * przeglądarka nie wysyła żądań typu Options(pre-flights) jeżeli dodamy nagłówek np. `Authentication`
    * w aplikacji mogę używać url relatywnych, nie martwiąc się o domenę backend - tak jak to wygląda w aplikacji produkcyjnej - zamiast http://localhost:8000/todos/ - todos/
    * używając proxy pracujemy z aplikcją w taki sam sposób jak byśmy mieli działającą aplikację produkcyjną
    */
    proxy: {
      '/*': {
        target: 'http://localhost:8000/'
      }
    }
  }
};
