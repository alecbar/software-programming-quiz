import Head from 'next/head'

export default function QuizComplete() {


    return (
        <div className="w-full">
            <Head>
                <title>Quiz Complete</title>
                <meta name="description" content="Software Programming Quiz" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="max-w min-h-screen">
                <div className="mx-auto p-12 text-center">
                    <p className="text-2xl">Thank you for completing your quiz. You can now exit this page.</p>
                </div>
            </main>

        </div>
    )
}