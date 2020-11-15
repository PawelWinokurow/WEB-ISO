using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ServiceReference1;
using ServiceReference2;

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
            //var url = "https://sapinterfaces-qas2.baywa.com/XISOAPAdapter/MessageServlet?senderParty=&amp;senderService=BC_Ping_over_External_AAE&amp;receiverParty=&amp;receiverService=&amp;interface=SI_Ping_Outbound&amp;interfaceNamespace=urn%3APing";
            var url = "https://sapinterfaces-qas2.baywa.com/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_Ping_over_External_AAE&receiverParty=&receiverService=&interface=SI_Ping_Outbound&interfaceNamespace=urn:Ping";
            var username = "T_SI_MONPING";
            var password = "a09KIqg?9ofO";

            DT_Ping ping = new DT_Ping();
            ping.Ping = "";
            SI_Ping_OutboundClient pingClient = new SI_Ping_OutboundClient(url, TimeSpan.FromMinutes(1), username, password);
            var data = await pingClient.SI_Ping_OutboundAsync(ping);
            

            /*
            var username = "T_SI_IWF_T";
            var password = "N}+XyAE]A]>WcfnlR3D-gRyCHRbdyk5]+w\f4hhm";

            SI_ISO_MGB_BAPI_PARTNER_CREATE_outboundClient client = new SI_ISO_MGB_BAPI_PARTNER_CREATE_outboundClient();
            client.ClientCredentials.UserName.UserName = username;
            client.ClientCredentials.UserName.Password = password;
            SI_ISO_MGB_BAPI_PARTNER_CREATE_outboundRequest request = new SI_ISO_MGB_BAPI_PARTNER_CREATE_outboundRequest();
            var data = await client.SI_ISO_MGB_BAPI_PARTNER_CREATE_outboundAsync(request);
            */
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
