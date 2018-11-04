using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Hosting;
using System.Web.Http;

namespace IncidentEnrichment.Api.Controllers
{
    [RoutePrefix("api/Incidents")]
    public class IncidentsController : ApiController
    {
        // GET /api/Incidents/

        [HttpGet]
        public async Task<IHttpActionResult> Get(string id)
        {
            try
            {
                var json = await GetJson(id);

                if (string.IsNullOrEmpty(json))
                {
                    return NotFound();
                }

                dynamic incident = JsonConvert.DeserializeObject(json);

                return Ok(incident);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        private async Task<string> GetJson(string incidentNumber)
        {
            string json = string.Empty;
            string filename = incidentNumber + ".json";
            string path = HostingEnvironment.MapPath("~/App_Data/") + filename;

            if (File.Exists(path))
            {
                using (var streamReader = new StreamReader(path))
                {
                    json = await streamReader.ReadToEndAsync();
                }
            }

            return json;
        }
    }
}
