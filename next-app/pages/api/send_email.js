// citation: some code and instruction from https://www.inextenso.dev/send-emails-and-attachments-with-amazon-ses-and-nextjs

import { NextApiRequest, NextApiResponse } from 'next';
import { tmpdir } from 'os';
import Path from 'path';
import fs from 'fs/promises';

import mailcomposer from 'mailcomposer';
import { SendRawEmailCommand, SESClient } from '@aws-sdk/client-ses';

const sesClient = new SESClient({
  region: 'eu-west-2', 
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// The following two utility functions are needed later on in the handler function

// The generated file will be streamed and added to the email
async function writeCSVtoFile(csv: string) {
  const filename = `orders-${new Date().getTime()}.csv`;
  const path = Path.join(tmpdir(), filename);
  
  await fs.writeFile(path, csv);
  console.info('✅ File written to disk', path);

  return { path, filename };
}

// Using mailcomposer simplifies a bit the object creation. It's not a hard requirement though.

const buildEmail = (emailTo: string) => {

  return mailcomposer({
    emailTo = 'success@simulator.amazonses.com', // for testing only
    to: [emailTo],
    from: 'cs467_software_quiz@gmail.com',
    html: `
          <h1>Software Programming Quiz:</h1>
          <p>link</p>
          `,
    subject: `Candidate Software Programming Quiz`,
  });
};

export default async (req: NextApiRequest, res: NextApiResponse<CheckoutAPIRes>) => {
  if (req.method !== 'POST') {
    return res.status(405).send({
      error: 'Method Not Allowed',
    });
  }
  
    try {

    buildEmail('cs467_software_quiz@gmail.com').build(async (err: any, message: any) => {
      if (err) {
        throw `Error sending raw email: ${err}`;
      }
      const data = await sesClient.send(new SendRawEmailCommand({ RawMessage: { Data: message } }));
      console.log('Email Message Id: ', data.MessageId);
    });

    res.status(200).json({ sent: 'ok' });
  } catch (error) {
    console.error(`❌ Failed to send email: `, error);

    return res.status(400).send({
      error: 'Could not send the email',
    });
  }
  
}