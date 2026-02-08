export const mainControllers = {
    home: (req, res) => res.render('./main/index'),
    contact: (req, res) => res.render('./main/contact'),
    about: (req, res) => res.render('./main/about'),
    faqs: (req, res) => res.render('./main/faqs')
}