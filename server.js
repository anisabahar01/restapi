// Loading the built-in http module which is necessary to create the server
const http = require('http');

// These are predefined datasets for randomness for later use for input and for the JSON responses
const scenarioData = {

  technologies: [
    'Cloud Computing',
    'Cybersecurity',
    'DevOps',
    'Networking',
    'Virtualization',
    'Artificial Intelligence',
    'Machine Learning',
    'Containerization',
    'Big Data',
    'Blockchain'
  ],

roles: [
  'System Administrator',
  'Software Engineer',
  'Security Analyst',
  'DevOps Engineer',
  'Cloud Architect',
  'Network Engineer',
  'IT Support Specialist',
  'Database Administrator',
  'AI/ML Engineer',
  'Penetration Tester'
],

environments: [
  'Enterprise Network',
  'Cloud Infrastructure',
  'On-Premises Data Center',
  'Hybrid Cloud Environment',
  'Remote Work Environment',
  'Development and Testing Environment',
  'Production Environment',
  'Edge Computing Environment'
],

challenges: [
    "System downtime during peak business hours",
  "Inconsistent deployment configurations across environments",
  "User access issues due to incorrect role assignments",
  "Integration failures between microservices",
  "Unexpected latency in API responses",
  "Inadequate log visibility during production issues",
  "Slow CI/CD pipeline execution",
  "Scaling bottlenecks under heavy load",
  "Security compliance gaps detected in audit",
  "Frequent network outages affecting remote teams"
],

incidents: [
  "Firewall misconfiguration blocked internal service communication",
  "Cloud service outage in the AWS US-East-1 region",
  "DNS propagation delay caused intermittent app failures",
  "Expired SSL certificate broke secure connections",
  "Container image vulnerability flagged by security scanner",
  "Load balancer misrouting traffic after config update",
  "Memory leak in microservice caused node crashes",
  "GitHub webhook failures disrupted automated deployments",
  "Database replication lag resulted in stale reads",
  "Unauthorized login attempt detected in IAM logs"
], 

troubleshootingSteps: [
  "Checked system logs and filtered for recent errors",
  "Rolled back to the previous stable deployment",
  "Restarted affected services using orchestration tools",
  "Verified DNS records and flushed local resolver cache",
  "Ran infrastructure health checks via monitoring dashboard",
  "Scaled services horizontally to handle load",
  "Replaced SSL certificate and restarted web services",
  "Reviewed access control policies and IAM configurations",
  "Updated container images with patched dependencies",
  "Validated CI/CD pipeline steps and logs for failures"
]

};

// This is the instruction to get a random item 
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// This creates the HTTP server
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/scenario') {
    let body = '';

    // This collects the incoming data 
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        // Parse the JSON input 
        const { technology, role, environment } = JSON.parse(body);

        // Validating the input
        if (!technology || !role || !environment) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          //error message if the input isn't correct
          res.end(JSON.stringify({ error: 'All fields required ' }));
          return;
        }

        //This will generate a random scenario 
        const scenario = {
          challenge: getRandomItem(scenarioData.challenges),
          incident: getRandomItem(scenarioData.incidents),
          troubleshootingStep: getRandomItem(scenarioData.troubleshootingSteps)
        };

        // This will generate a response to the scenario
        const response = {
          inputs: { technology, role, environment },
          scenario
        };

        // check whether the request has succeeded or failed and sends a response accordingly, 200 if everything works and 400 if it doesn't
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(response));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON format' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Path not found' }));
  }
});

// Defining which port the server listens to 
const PORT = 4000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
