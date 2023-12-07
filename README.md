# Authors
* **Leo Simberg**: IoT Partner Solutions Architect

# Sending Amazon Monitron Data to AWS IoT Sitewise via Kinesis

This demonstrates how data from Amazon Monitron can be sent to AWS IoT Sitewise via Amazon Kinesis. Using this process enables the data from Monitron sensors to be analyzed and reported on in AWS IoT Sitewise. It also allows the Monitron data to be integrated with data from other devices, building a more comprehensive view of industrial equipment health and performance.

The source code in this sample repository was written in the simplest way possible to facilitate understanding of the steps to integrate the services. It is not intended for production use.

**References:**

- **Amazon Monitron** - [Service Site](https://aws.amazon.com/monitron/)
- **AWS IoT Sitewise** - [Service Site](https://aws.amazon.com/iot-sitewise/)
- **How to use CDK** - [CDK Workshop](https://cdkworkshop.com/)
- **How to export Monitron data via Amazon Kinesis** - [Documentation](https://docs.aws.amazon.com/Monitron/latest/user-guide/monitron-kinesis-export-v2.html)


## Prerequisites

Before you begin, ensure that you have the following prerequisites:

- [Node.js](https://nodejs.org/) installed (CDK is based on Node.js).
- AWS CDK installed globally. You can install it using npm:
  ```bash
  npm install -g aws-cdk

- AWS CLI configured with appropriate credentials.


## Installation
1. Clone this repository:

```bash
git clone git@github.com:aws-samples/integrate-monitron-with-sitewise-demo.git
```

2. Change into the project directory:
```bash
cd integrate-monitron-with-sitewise-demo
```

3. Install dependencies:
```bash
npm install
```

## Usage
1. Deploy the CDK application to create the Sitewise models and assets, the Kinesis Stream, and the Lambda to process the events.

```bash
cdk deploy
```

2. Configure the MonitronMessageHandler Lambda Environment Variables to associate the Sitewise AssetID and the PropertiesIDs.

## Cleanup
To remove the deployed resources, run the following command:

```bash
cdk destroy
```

### Contributing
Contributions to improve and extend this sample project are welcome! If you find a bug or have an idea for an enhancement, please open an issue or submit a pull request.

### License
This library is licensed under the MIT-0 License. See the LICENSE file.

### 
# Special Thanks
* Bin Qiu: Partner Solutions Architect 
* Nick White: Partner Solutions Architect
