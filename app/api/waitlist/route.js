const webhookurl = 'https://discord.com/api/webhooks/1289734254129053738/oSqMOukU9ikwvpbCzE-EI9MXCbwQtJkCiEWa0tc8b-oA9Y0X_B6LmXH_jnJmWJOb1QXb';

const sendMessage = (name, email, feedback) => {
    fetch(webhookurl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: `From waitlist.\nName: ${name}\nEmail: ${email}\Experience: ${feedback}`
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });
};

export async function POST(request) {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const feedback = formData.get('experience');
    let res = 'Thank you for your feedback!';

    if (!name || !email || !feedback) {
        res = 'Please fill in all fields';
    } else {
        sendMessage(name, email, feedback);
    }

    return new Response(JSON.stringify({ res }), {
        headers: { 'Content-Type': 'application/json' }
    });
}