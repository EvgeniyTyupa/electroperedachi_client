import { SitemapStream, streamToPromise } from "sitemap"
import { Readable } from "stream"
import { employeeApi, eventApi, newsApi } from "../../api/api"

export default async function handler(req, res) {
    try {
        // Define the base URL of your website
        const baseUrl = "https://electroperedachi.com"

        // Create a new SitemapStream
        const stream = new SitemapStream({ hostname: baseUrl })

        // Add URL routes to the sitemap
        stream.write({ url: "/", changefreq: "weekly", priority: 1.0 })
        stream.write({ url: "/events", changefreq: "daily", priority: 0.9 })
        stream.write({ url: "/news", changefreq: "daily", priority: 0.8 })
        stream.write({ url: "/contacts", changefreq: "monthly", priority: 0.5 })
        stream.write({ url: "/artists", changefreq: "monthly", priority: 0.4 })
        stream.write({ url: "/about", changefreq: "monthly", priority: 0.4 })

        const { news } = await newsApi.getNews(1, 10000, "desc")
        const { events } = await eventApi.getEvents(1, 10000)
        const { employees } = await employeeApi.getEmployees(1, 10000)

        const residents = employees.filter((el) => el.role === "artist")

        news.forEach((post) => {
            stream.write({
                url: `/news/${post.code}`,
                changefreq: "weekly",
                priority: 0.5
            })
        })

        events.forEach((event) => {
            stream.write({
                url: `/events/${event.title_code}`,
                changefreq: "weekly",
                priority: 0.5
            })
        })

        residents.forEach((dj) => {
            stream.write({
                url: `/artists/${dj.name_code}`,
                changefreq: "weekly",
                priority: 0.5
            })
        })

        // End the stream
        stream.end()

        // Generate the XML from the stream
        const sitemapXml = await streamToPromise(Readable.from(stream)).then(
            (data) => data.toString()
        )

        // Set the appropriate headers and send the XML response
        res.setHeader("Content-Type", "application/xml")
        res.write(sitemapXml)
        res.end()
    } catch (err) {
        console.error("Error generating sitemap:", error)
        res.status(500).end()
    }
}
