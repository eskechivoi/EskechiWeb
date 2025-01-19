# SSM in AWS SysOps

SSM is an AWS service that is really useful for running operations and easily managing a fleet of instances.  SSM is also useful for security as we don't need to open an SSH port or give permissions to a system administrator because each instance's SSM agent handles the communication securely.

In order to get started with Systems Manager, we first need to register some instances within it. To do this, go to the SSM service and select "Node Tools" -> "Fleet Manager".

![](http://localhost/mdimg/SSM_SysOps/Pasted%20image%2020250106175637.png)

As we can see, there isn't a managed instance yet, so we need to go to the "EC2" service and start a new instance. The instance must meet these two requirements:
- It must have the SSM agent installed and running.
- It must have the correct IAM permissions to talk to the SSM service.
Thus, a good choice for this is to use the Amazon Linux 2023 AMI.

When creating the instances, we are going to create a new IAM profile to be able to access the SSM service:

![](http://localhost/mdimg/SSM_SysOps/Pasted%20image%2020250106180236.png)

We will allow a service (EC2) to perform actions on this account. Then we need to select the EC2 service and click on the EC2 use case.

![](http://localhost/mdimg/SSM_SysOps/Pasted%20image%2020250106180400.png)

Then, add the `AmazonSSMManagedInstanceCore` which enables the core service functionality:

![](http://localhost/mdimg/SSM_SysOps/Pasted%20image%2020250106180533.png)

Now, before we launch the instances, we must assign the role to them:

![](http://localhost/mdimg/SSM_SysOps/Pasted%20image%2020250106180713.png)

Finally, change the "Number of instances" to 3 and click "Launch instance". As we are using the Amazon Linux 2023 AMI and the correct IAM permissions, the instances should appear in the Fleet Manager screen on the SSM service when they are finished launching.

![](http://localhost/mdimg/SSM_SysOps/Pasted%20image%2020250106181118.png)

We can see the same three instances that appear in the "Instances" dashboard on the EC2 service. What's more, we can also see the SSM Agent version installed on them.
## Tag Resources
Tags are useful because we can operate SSM at group level, so we can perform some actions on all instances in a group at once.

To create a new tag, we need to select the instance in the Instances dashboard in the EC2 service and then click on Tags -> Manage Tags.

![](http://localhost/mdimg/SSM_SysOps/Pasted%20image%2020250106182013.png)

Tags are tuples of key pair values. We can add two new tags to our instance:

![](http://localhost/mdimg/SSM_SysOps/Pasted%20image%2020250106182153.png)

Now tag another instance with the same values, changing the `Environment` tag to `Prod`, and the last instance with the `Environment` tag set to `Dev` and the `Team` tag set to `Ops`. We can now create a tag-based resource group in the Resource Groups service. We will manage the resource type "EC2 Instance".

![](http://localhost/mdimg/SSM_SysOps/Pasted%20image%2020250106182703.png)

Now, in the Tags section, add the `Environment` tag to be equal to `Dev`. If we click on "Preview Group Resources", we can see that there are two instances in our resource group.

![](http://localhost/mdimg/SSM_SysOps/Pasted%20image%2020250106182830.png)

Similarly, we can create another resource group for the `Prod` environment, and a final resource group for the `Engineering` team tag.
## SSM - Documents
Documents are the core of SSM. They are JSON or YAML files that define
- Parameters
- A set of steps or **actions** (_what the document does_)
And then you have the document executed by a specific service.

To manage these documents, we go to the SSM service. In the latest version of the AWS console, we find the documents under the "Change Management Tools" section:

![](http://localhost/mdimg/SSM_SysOps/Pasted%20image%2020250106184321.png)

For example, we can search for the `AWS-RunPatchBaseline` document, which is owned by Amazon. In `Content`, we can see all the different commands that are executed for each action, and in `Details`, we can see all the different parameters that the document defines.

We can create two different types of document:
- **Command or Session**: Runs the entire document or command across a fleet of EC2 instances.
- Automation

Now let us create a new 'command' document that will install `httpd`. Set the document type to Command and the target type to `/AWS::EC2::Instance`. Then, in the content section, add the following:

```json
{
  "schemaVersion": "2.2",
  "description": "Command Document to install httpd on Amazon Linux 2023",
  "parameters": {
    "Message": {
      "type": "String",
      "description": "Message to be displayed on the website.",
      "default": "Hello World"
    }
  },
  "mainSteps": [
    {
      "action": "aws:runShellScript",
      "name": "installHttpd",
      "inputs": {
        "runCommand": [ 
          "sudo yum update -y",
          "sudo yum install -y httpd",
          "sudo systemctl start httpd",
          "sudo systemctl enable httpd",
          "echo \"{{Message}} from $(hostname -f)\" > /var/www/html/index.html"
        ]
      }
    }
  ]
}
```

Now, the new document should appear in the "Owned by me" section. Finally, we can go to "Node Tools" > "Run Command" and run the command document.

![](http://localhost/mdimg/SSM_SysOps/Pasted%20image%2020250106191749.png)

Select the command document you want to run:

![](http://localhost/mdimg/SSM_SysOps/Pasted%20image%2020250106191837.png)

We can configure the message to be displayed on the website because we defined it as a parameter earlier:

![](http://localhost/mdimg/SSM_SysOps/Pasted%20image%2020250106191950.png)

Now the resource groups we created earlier come in handy as we can decide to run this command document on a specific resource group.

![](http://localhost/mdimg/SSM_SysOps/Pasted%20image%2020250106192143.png)

Since we only have 3 instances, we'll tell SSM to run the task on one instance at a time, and since this is a really simple command, we don't expect any errors, so I'll set the error threshold to 0. 

We can also choose to send the output to either AWS CloudWatch or AWS S3. Note that in order to log the output to a log group in CloudWatch, that log group must exist. In addition, the instance must have sufficient permissions to log events to CloudWatch. To do this, add the `CloudWatchAgentAdminPolicy` and the `CloudWatchAgentServerPolicy` permission policies to the IAM role.

Once we click run, we can see the running status and also see the output and log messages.

![](http://localhost/mdimg/SSM_SysOps/Pasted%20image%2020250106192749.png)

If you now copy the public IP of the instance and navigate to it, you should see the following message:

```
Personalised message from <hostname>
```
# Automations
To execute an automation, go to the Systems Manager (_SSM_) and, under the "Change Management Tools", click on "Automation". Then, click on "Execute automation".

After selecting an automation, scroll down to see the document (_runbook_) details. There, you can select the Runbook version to run.

Now, we have to choose where we want the document (_runbook_) to be executed. We can choose between:
- Simple execution (_execute on ALL targets at the same time_)
- Rate control (_execute on one target at a time_)
- Multi-account and Region
- Manual execution (_step by step runbook mode_)

As a parameter, we can select the `InstanceId`, and we can filter in which instances to execute the _runbook_ by tags, resource group, parameter values or all instances. If we, for instance, select the `DevGroup` resource group, that would mean that we want to restart all our 'Dev' instances.

The difference between the "commands" and the "automations" is that the automations allow you to define complex workflows, with different steps depending on what happens during the execution, and the commands are ideal for ad-hoc executions.

![](http://localhost/mdimg/SSM_SysOps/Pasted%20image%2020250111195326.png)

# SSM Parameter Store
We can find the parameter store in the AWS Systems Manager service (SSM), under the "Application Tools" section.

We can directly create parameters inside a hierarchy even if we haven't defined the upper level before. For instance, we can directly create the `/my-app/dev/db-url` without having previously defined `/my-app` as a parameter. 

We can have three types of parameters:
- Strings
- StringList
- SecureString -> The String is encrypted using the KMS keys from our account.

We can also use different data types to validate the type of data that we are entering, or to organise the different parameters.

If you choose a `SecureString`, you have to additionally select the AWS account that owns the KMS key to be used, and also the KMS key to use.

After creating the parameter, we can see the history of the values and the tags, used to organise and restrict the access to the parameter.
### Get the parameters from `CloudShell`
For the purposes of this section, we'll assume that the following parameters have been created:

![](http://localhost/mdimg/SSM_SysOps/Pasted%20image%2020250112185141.png)

```bash
aws ssm get-parameters --names <param1> <param2> ... <param_n>

# For example
aws ssm get-parameters --names /my-app/dev/db-url /my-app/dev/db-password
```

If the value is a `SecureString` (_thus, it is encrypted_) the encrypted value is shown:

```json
{
    "Parameters": [
        {
            "Name": "/my-app/dev/db-password",
            "Type": "SecureString",
            "Value": "AQICAHgZRYzguAe0DGwuomFMriseEuM16x8UEz8RPIMle70T+gHTyjaYoafVNX7ScjFMKwtAAAAAbjBsBgkqhkiG9w0BBwagXzBdAgEAMFgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMSof3ekxNLkE9HMvZAgEQgCu9oPxobzkUyY1lJ1Oyi7zIot0AsG2Rc1n8JoHugDOEq/Vje5CXoZuuoL5N",
            "Version": 1,
            "LastModifiedDate": "2025-01-11T19:13:52.351000+00:00",
            "ARN": "arn:aws:ssm:eu-west-3:767828735996:parameter/my-app/dev/db-password",
            "DataType": "text"
        },
        {
            "Name": "/my-app/dev/db-url",
            "Type": "String",
            "Value": "dev.database.ferrodrmar.com:3306",
            "Version": 1,
            "LastModifiedDate": "2025-01-11T19:10:29.430000+00:00",
            "ARN": "arn:aws:ssm:eu-west-3:767828735996:parameter/my-app/dev/db-url",
            "DataType": "text"
        }
    ],
    "InvalidParameters": []
}
```

If you add the `--with-decryption` flag, the command will check if the account that is running the command has enough permissions to decrypt that secret.

```bash
aws ssm get-parameters --names /my-app/dev/db-url /my-app/dev/db-password --with-decryption
```

```json
{
    "Parameters": [
        {
            "Name": "/my-app/dev/db-password",
            "Type": "SecureString",
            "Value": "asdfasdf12341234",
            "Version": 1,
            "LastModifiedDate": "2025-01-11T19:13:52.351000+00:00",
            "ARN": "arn:aws:ssm:eu-west-3:767828735996:parameter/my-app/dev/db-password",
            "DataType": "text"
        },
        {
            "Name": "/my-app/dev/db-url",
            "Type": "String",
            "Value": "dev.database.ferrodrmar.com:3306",
            "Version": 1,
            "LastModifiedDate": "2025-01-11T19:10:29.430000+00:00",
            "ARN": "arn:aws:ssm:eu-west-3:767828735996:parameter/my-app/dev/db-url",
            "DataType": "text"
        }
    ],
    "InvalidParameters": []
}
```
#### `get-parameters-by-path`
It is going to query for all the parameters under the path provided:

```bash
aws ssm get-parameters-by-path --path <path>

# For example
aws ssm get-parameters-by-path --path /my-app/dev
```

The previous example would return:

```json
{
    "Parameters": [
        {
            "Name": "/my-app/dev/db-password",
            "Type": "SecureString",
            "Value": "AQICAHgZRYzguAe0DGwuomFMriseEuM16x8UEz8RPIMle70T+gHTyjaYoafVNX7ScjFMKwtAAAAAbjBsBgkqhkiG9w0BBwagXzBdAgEAMFgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMSof3ekxNLkE9HMvZAgEQgCu9oPxobzkUyY1lJ1Oyi7zIot0AsG2Rc1n8JoHugDOEq/Vje5CXoZuuoL5N",
            "Version": 1,
            "LastModifiedDate": "2025-01-11T19:13:52.351000+00:00",
            "ARN": "arn:aws:ssm:eu-west-3:767828735996:parameter/my-app/dev/db-password",
            "DataType": "text"
        },
        {
            "Name": "/my-app/dev/db-url",
            "Type": "String",
            "Value": "dev.database.ferrodrmar.com:3306",
            "Version": 1,
            "LastModifiedDate": "2025-01-11T19:10:29.430000+00:00",
            "ARN": "arn:aws:ssm:eu-west-3:767828735996:parameter/my-app/dev/db-url",
            "DataType": "text"
        }
    ]
}
```

The previous command only returns the parameters that are its immediate children. The option `--recursive` allows you to query all the parameters that are below a specific path in the hierarchy.

```bash
aws ssm get-parameters-by-path --path /my-app/ --recursive
```

```json
{
    "Parameters": [
        {
            "Name": "/my-app/dev/db-password",
            "Type": "SecureString",
            "Value": "AQICAHgZRYzguAe0DGwuomFMriseEuM16x8UEz8RPIMle70T+gHTyjaYoafVNX7ScjFMKwtAAAAAbjBsBgkqhkiG9w0BBwagXzBdAgEAMFgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMSof3ekxNLkE9HMvZAgEQgCu9oPxobzkUyY1lJ1Oyi7zIot0AsG2Rc1n8JoHugDOEq/Vje5CXoZuuoL5N",
            "Version": 1,
            "LastModifiedDate": "2025-01-11T19:13:52.351000+00:00",
            "ARN": "arn:aws:ssm:eu-west-3:767828735996:parameter/my-app/dev/db-password",
            "DataType": "text"
        },
        {
            "Name": "/my-app/dev/db-url",
            "Type": "String",
            "Value": "dev.database.ferrodrmar.com:3306",
            "Version": 1,
            "LastModifiedDate": "2025-01-11T19:10:29.430000+00:00",
            "ARN": "arn:aws:ssm:eu-west-3:767828735996:parameter/my-app/dev/db-url",
            "DataType": "text"
        },
        {
            "Name": "/my-app/prod/db-password",
            "Type": "SecureString",
            "Value": "AQICAHgZRYzguAe0DGwuomFMriseEuM16x8UEz8RPIMle70T+gGdubV4fUR4eRslfubB2cHPAAAAbjBsBgkqhkiG9w0BBwagXzBdAgEAMFgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQMJUln1N8nByzH7MlsAgEQgCsxeIjV/OznYmSzBHcUMcVWu6x7qof5CVCK6Fvt6RmhlrDo/PcS1yiHzhl/",
            "Version": 1,
            "LastModifiedDate": "2025-01-12T17:28:55.291000+00:00",
            "ARN": "arn:aws:ssm:eu-west-3:767828735996:parameter/my-app/prod/db-password",
            "DataType": "text"
        },
        {
            "Name": "/my-app/prod/db-url",
            "Type": "String",
            "Value": "prod.database.ferrodrmar.com:3306",
            "Version": 1,
            "LastModifiedDate": "2025-01-12T17:28:17.206000+00:00",
            "ARN": "arn:aws:ssm:eu-west-3:767828735996:parameter/my-app/prod/db-url",
            "DataType": "text"
        }
    ]
}
```

Finally, you can combine these two flags with the `--with-decryption` flag to obtain all these parameter values decrypted.
# SSM Inventory

Open the AWS Systems Manager (_SSM_) service and, on the left menu, click on "Node Tools" -> "Inventory". Then, we need to setup inventory first. To do so, click on "Setup Inventory", and leave every parameter by default. Once you've clicked on "Setup Inventory", a green message should appear indicating that the request has succeeded. 

Click on "View Details" to see the inventory association. This will open the association in the state manager, that is a way to apply states to different instances to make sure that they are all in the same state. Thus, the state that we created is the one that allow us to gather the software inventory:

![](http://localhost/mdimg/SSM_SysOps/Pasted%20image%2020250112190431.png)

If we click on `Targets`, we can see that the state is being applied for all instances:

![](http://localhost/mdimg/SSM_SysOps/Pasted%20image%2020250112190514.png)
### Resource data syncs
Resource data sync lets you sync inventory data to Amazon S3. You can sync inventory data collected from multiple AWS accounts or regions to a single S3 bucket, thus enabling a single view of inventory data across AWS accounts or regions.

To create a resource data sync, go to "Detailed View" and click on "Create resource data sync". Then, add the bucket name. Take into account that **the bucket must exist**.

Additionally, there must be enough permissions for SSM to sync the data into S3. The steps to do so can be found on the [AWS documentation](https://docs.aws.amazon.com/systems-manager/latest/userguide/inventory-create-resource-data-sync.html). 

The Resource data will use AWS Athena to query the data from the Amazon S3 bucket. Once created, select the Resource data sync (_it may take around 5 minutes to populate_).
#### Create a bucket
Open the S3 service and click on "Create bucket". Leave everything by default and then click on "Create bucket".

Now, open the bucket and go to the "Permissions tab". There, edit the "Bucket policy", and edit the JSON specified in the [AWS documentation](https://docs.aws.amazon.com/systems-manager/latest/userguide/inventory-create-resource-data-sync.html), changing the `"Resource": "arn:aws:s3:::amzn-s3-demo-bucket"` for the actual name of our bucket, and the `accountid=ID_ACCOUNT` for your account ID:

![](http://localhost/mdimg/SSM_SysOps/Pasted%20image%2020250112193907.png)

If this does not work, make it a little bit more permissive:

```json
// IF THIS DOES NOT WORK
arn:aws:s3:::demo-ssm-inventory-ferrodrmar/*/accountid=1111111111/*

// MAKE IT A LITTLE BIT MORE PERMISSIVE
arn:aws:s3:::demo-ssm-inventory-ferrodrmar/*
```
