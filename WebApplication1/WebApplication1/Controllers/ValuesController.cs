using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ServiceReference1;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<string>>> GetAsync()
        {
            DT_Ping ping = new DT_Ping();
            ping.Ping = "";
            SI_Ping_OutboundClient pingClient = new SI_Ping_OutboundClient();
            pingClient.ClientCredentials.UserName.UserName = "T_SI_MONPING";
            pingClient.ClientCredentials.UserName.Password = "a09KIqg?9ofO";
            var data = await pingClient.SI_Ping_OutboundAsync(ping);
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
        /*
        [HttpGet]
        public async Task<string[]> Get()
        {
            ServiceReference1.AuthorServiceClient authorServiceClient = new ServiceReference1.AuthorServiceClient();
            var data = await authorServiceClient.GetAuthorNamesAsync();
            return data;
        }
        */
    }
}
