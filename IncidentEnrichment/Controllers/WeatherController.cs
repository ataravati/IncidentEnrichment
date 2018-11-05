using Newtonsoft.Json;
using System;
using System.Configuration;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace IncidentEnrichment.Controllers
{
    public class WeatherController : ApiController
    {
        // GET /api/Weather/

        public async Task<IHttpActionResult> Get(string latitude, string longitude, DateTime startDate, DateTime endDate)
        {
            var client = new HttpClient();
            string apiKey = ConfigurationManager.AppSettings["WeatherApiKey"];
            string apiUrl = ConfigurationManager.AppSettings["WeatherApiUrl"];
            if ((endDate - startDate).Hours < 1)
            {
                endDate = startDate.AddHours(1);
            }
            var start = startDate.ToString("yyyy-MM-dd:HH");
            var end = endDate.ToString("yyyy-MM-dd:HH");
            string requestUri = apiUrl + "?key=" + apiKey;
            requestUri += "&lat=" + latitude;
            requestUri += "&lon=" + longitude;
            requestUri += "&start_date=" + start;
            requestUri += "&end_date=" + end;
            requestUri += "&units=I";

            try
            {
                HttpResponseMessage response = await client.GetAsync(requestUri);
                var responseBody = await response.Content.ReadAsStringAsync();

                dynamic weather = JsonConvert.DeserializeObject(responseBody);

                return Ok(weather);
            }
            catch (HttpResponseException ex)
            {
                return InternalServerError(ex);
            }

        }
    }
}
