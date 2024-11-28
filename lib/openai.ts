import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OpenAI API key');
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generatePageContent(
    pageType: string,
    title: string,
    businessInfo: {
        name: string;
        description?: string;
        mission?: string;
        services?: string[];
    }
): Promise<string> {
    try {
        const prompt = getPromptForPageType(pageType, title, businessInfo);

        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "system",
                    content: "You are a professional content writer specializing in childcare and education websites an professional website designer specializing in tailwind css. Create engaging, SEO-friendly html webpage that speaks directly to parents and families. Arrange the content in side the template"
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 2000,
        });

        const content = completion.choices[0].message.content;
        if (!content) {
            throw new Error('No content generated');
        }

        return content;
    } catch (error: any) {
        console.error('OpenAI API Error:', error);
        throw new Error(error.message || 'Failed to generate content');
    }
}

function getPromptForPageType(
    pageType: string,
    title: string,
    businessInfo: {
        name: string;
        description?: string;
        mission?: string;
        services?: string[];
    }
): string {
    const baseInfo = `
Business Name: ${businessInfo.name}
${businessInfo.description ? `Description: ${businessInfo.description}` : ''}
${businessInfo.mission ? `Mission: ${businessInfo.mission}` : ''}
${businessInfo.services ? `Services: ${businessInfo.services.join(', ')}` : ''}
`.trim();

    const commonInstructions = `
Generate professional, SEO-optimized content in clean Tailwind CSS with elegant design.
Use semantic HTML tags (h1, h2, h3, p, ul, li, etc.).
Include schema.org structured data where appropriate.
Focus on building trust and showcasing expertise.
Make the content engaging and parent-focused.
Ensure mobile-friendly formatting. 
`.trim();

    switch (pageType) {
        case 'home':
            return `Create a compelling homepage for a childcare center that includes the following Sections:

1. Hero Section:
- Attention-grabbing headline
- Clear value proposition
- Emotional connection with parents

2. Key Benefits:
- Safety and security measures
- Educational approach highlights
- Qualified staff overview
- Parent testimonial snippets

3. Programs Overview:
- Age-appropriate programs
- Educational philosophy
- Development milestones
- Schedule flexibility

4. Call-to-Action:
- Tour scheduling
- Contact information
- Parent resources

Use this as header sections just replace this with our content this is just an example for Top navigation panel: 
<header id="header" class="sticky top-0 transition-[top] duration-300 z-40">
        <div id="header-container">
            <!-- top header start -->
            <div id="top-header" class="bg-destructive sm:block hidden">
                <div class="container">
                    <div class="flex lg:flex-row flex-col justify-between items-center gap-2 py-[13px]">
                        <div>
                            <ul class="flex gap-7.5">
                                <li>
                                    <a href="" class="text-cream-foreground flex items-start gap-4">
                                        <span><i class="fa-solid fa-phone"></i></span> <span>(629) 555-0129</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="" class="text-cream-foreground flex items-start gap-4"> 
                                        <span><i class="fa-solid fa-envelope"></i></span> <span>info@example.com</span>
                                    </a>
                                </li>
                                <li>
                                    <p class="text-cream-foreground flex items-start gap-4"> 
                                        <span><i class="fa-solid fa-location-dot"></i></span> <span>6391 Elgin St. Celina, 10299</span>
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul class="flex items-center gap-[14px]">
                                <li><a href="" class="rounded-md w-6 h-6 flex text-xs items-center justify-center border border-white border-opacity-20 text-cream-foreground hover:bg-primary transition-all duration-500"><i class="fa-brands fa-facebook-f "></i></a></li>
                                <li><a href="" class="rounded-md w-6 h-6 flex text-xs items-center justify-center border border-white border-opacity-20 text-cream-foreground hover:bg-primary transition-all duration-500"><i class="fa-brands fa-x-twitter"></i></a></li>
                                <li><a href="" class="rounded-md w-6 h-6 flex text-xs items-center justify-center border border-white border-opacity-20 text-cream-foreground hover:bg-primary transition-all duration-500"><i class="fa-brands fa-linkedin"></i></a></li>
                                <li><a href="" class="rounded-md w-6 h-6 flex text-xs items-center justify-center border border-white border-opacity-20 text-cream-foreground hover:bg-primary transition-all duration-500"><i class="fa-brands fa-pinterest-p"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <!-- top header end -->
            <!-- bottom header -->
            <div class="[.header-pinned_&amp;]:shadow-md bg-background transition-all duration-300">
                <div class="container py-5 ">
                    <div class="flex justify-between items-center ">
                        <div>
                            <a href="index.html" class="flex items-center gap-1">
                                <img src="assets/images/logo.png" alt="img">
                                <span class="font-bold text-3xl ">Ascent</span>
                            </a>
                        </div>
                        <div class="flex items-center">
                            <!-- desktop navbanr start -->
                            <nav class="xl:block hidden">
                                <ul class="flex items-center gap-[25px]">
                                    <li class="leading-[164%] relative py-5 group">
                                        <a href="#" class="font-semibold text-lg font-jost group-hover:text-primary-foreground transition-all duration-500 py-5">Home <span class=""><i class="fa-solid fa-angle-down text-sm"></i></span></a>

                                        <ul class="absolute top-full z-10 bg-background shadow-sm min-w-56 transition-all duration-500 opacity-0 invisible translate-y-5 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0">
                                            <li>
                                                <a href="index.html" class=" font-semibold font-jost hover:text-cream-foreground hover:bg-primary transition-all duration-500 py-3 px-2.5 block border-b border-b-slate-300">Home-1</a>
                                            </li>
                                            <li>
                                                <a href="index-2.html" class=" font-semibold font-jost hover:text-cream-foreground hover:bg-primary transition-all duration-500 py-3 px-2.5 block border-b border-b-slate-300">Home-2</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="leading-[164%] relative group">
                                        <a href="about.html" class="font-semibold text-lg font-jost group-hover:text-primary-foreground transition-all duration-500">About Us</a>
                                    </li>
                                    <li class="leading-[164%] relative py-5 group">
                                        <a href="#" class=" font-semibold text-lg font-jost group-hover:text-primary-foreground transition-all duration-500">Services <span class=""><i class="fa-solid fa-angle-down text-sm"></i></span></a>
                                        
                                        <ul class="absolute top-full z-10 bg-background shadow-sm min-w-56 transition-all duration-500 opacity-0 invisible translate-y-5 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0">
                                            <li>
                                                <a href="services.html" class=" font-semibold font-jost hover:text-cream-foreground hover:bg-primary transition-all duration-500 py-3 px-2.5 block border-b border-b-slate-300">Services</a>
                                            </li>
                                            <li>
                                                <a href="service-details.html" class=" font-semibold font-jost hover:text-cream-foreground hover:bg-primary transition-all duration-500 py-3 px-2.5 block border-b border-b-slate-300">Service Details</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="leading-[164%] relative py-5 group">
                                        <a href="#" class=" font-semibold text-lg font-jost group-hover:text-primary-foreground transition-all duration-500">Blog <span class=""><i class="fa-solid fa-angle-down text-sm"></i></span></a>
                                        
                                        <ul class="absolute top-full z-10 bg-background shadow-sm min-w-56 transition-all duration-500 opacity-0 invisible translate-y-5 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0">
                                            <li>
                                                <a href="blog.html" class=" font-semibold font-jost hover:text-cream-foreground hover:bg-primary transition-all duration-500 py-3 px-2.5 block border-b border-b-slate-300">Blog</a>
                                            </li>
                                            <li>
                                                <a href="blog-details.html" class=" font-semibold font-jost hover:text-cream-foreground hover:bg-primary transition-all duration-500 py-3 px-2.5 block border-b border-b-slate-300">Blog Details</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="leading-[164%] relative py-5 group">
                                        <a href="#" class=" font-semibold text-lg font-jost group-hover:text-primary-foreground transition-all duration-500">Page <span class=""><i class="fa-solid fa-angle-down text-sm"></i></span></a>
                                        
                                        <ul class="absolute top-full z-10 bg-background shadow-sm min-w-56 transition-all duration-500 opacity-0 invisible translate-y-5 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0">
                                            <li>
                                                <a href="about.html" class=" font-semibold font-jost hover:text-cream-foreground hover:bg-primary transition-all duration-500 py-3 px-2.5 block border-b border-b-slate-300">About</a>
                                            </li>
                                            <li>
                                                <a href="services.html" class=" font-semibold font-jost hover:text-cream-foreground hover:bg-primary transition-all duration-500 py-3 px-2.5 block border-b border-b-slate-300">Services</a>
                                            </li>
                                            <li>
                                                <a href="service-details.html" class=" font-semibold font-jost hover:text-cream-foreground hover:bg-primary transition-all duration-500 py-3 px-2.5 block border-b border-b-slate-300">Service Details</a>
                                            </li>
                                            <li>
                                                <a href="faq.html" class=" font-semibold font-jost hover:text-cream-foreground hover:bg-primary transition-all duration-500 py-3 px-2.5 block border-b border-b-slate-300">Faq</a>
                                            </li>
                                            <li>
                                                <a href="portfolio.html" class=" font-semibold font-jost hover:text-cream-foreground hover:bg-primary transition-all duration-500 py-3 px-2.5 block border-b border-b-slate-300">Portfolio</a>
                                            </li>
                                            <li>
                                                <a href="contact.html" class=" font-semibold font-jost hover:text-cream-foreground hover:bg-primary transition-all duration-500 py-3 px-2.5 block border-b border-b-slate-300">Contact</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="leading-[164%] relative group">
                                        <a href="contact.html" class=" font-semibold text-lg font-jost group-hover:text-primary-foreground transition-all duration-500">Contact Us</a>
                                    </li>
                                </ul>
                            </nav>
                            <!-- desktop navbanr end -->

                            <!-- tab and mobile navbanr start -->
                            <div class="block xl:hidden">
                                <div class="fixed left-0 top-0 w-full h-full bg-black/30 invisible transition-all offcanva-overlay"></div>
                                <nav class="bg-warm border-l-2 border-l-primary w-full max-w-md min-h-screen h-full overflow-y-auto p-7 shadow-md fixed -right-full top-0 z-50 transition-all duration-500 offcanva">
                                    <div class="flex justify-between items-center">
                                        <a href="" class="flex items-center gap-1">
                                            <img src="assets/images/logo.png" alt="img">
                                            <span class="font-bold text-3xl ">Ascent</span>
                                        </a>
                                        <div class="bg-primary w-10 h-10 text-cream-foreground flex items-center justify-center rounded-[4px] left-4 offcanvaClose">
                                            <i class="fa-solid fa-xmark text-xl"></i>
                                        </div>
                                    </div>
                                    <ul class=" mt-6">
                                        <li class="leading-[164%] relative w-full dropdown">
                                            <a href="#" class="font-jost py-2.5 border-b border-b-slate-300 text-[#385469] flex justify-between items-center">
                                                <span>Home</span>
                                                <i class="fa-solid fa-plus"></i>
                                            </a>
                                            
                                            <ul class="max-h-0 min-w-56 w-full opacity-0 invisible transition-all duration-500 dropdown-item">
                                                <li>
                                                    <a href="index.html" class="text-[#385469] font-jost hover:text-secondary-foreground transition-all duration-500 py-2.5 px-6 block border-b border-b-slate-300">Home-1</a>
                                                </li>
                                                <li>
                                                    <a href="index-2.html" class="text-[#385469] font-jost hover:text-secondary-foreground transition-all duration-500 py-2.5 px-6 block border-b border-b-slate-300">Home-2</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="leading-[164%] relative w-full">
                                            <a href="about.html" class="font-jost py-2.5 border-b border-b-slate-300 text-[#385469] flex justify-between items-center">About Us</a>
                                        </li>
                                        <li class="leading-[164%] relative w-full dropdown">
                                            <a href="#" class="font-jost py-2.5 border-b border-b-slate-300 text-[#385469] flex justify-between items-center">
                                                <span>Services</span>
                                                <i class="fa-solid fa-plus"></i>
                                            </a>
                                            
                                            <ul class="max-h-0 min-w-56 w-full opacity-0 invisible transition-all duration-500 dropdown-item">
                                                <li>
                                                    <a href="services.html" class="text-[#385469] font-jost hover:text-secondary-foreground transition-all duration-500 py-2.5 px-6 block border-b border-b-slate-300">Services</a>
                                                </li>
                                                <li>
                                                    <a href="service-details.html" class="text-[#385469] font-jost hover:text-secondary-foreground transition-all duration-500 py-2.5 px-6 block border-b border-b-slate-300">Service Details</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="leading-[164%] relative w-full dropdown">
                                            <a href="#" class="font-jost py-2.5 border-b border-b-slate-300 text-[#385469] flex justify-between items-center">
                                                <span>Blog</span>
                                                <i class="fa-solid fa-plus"></i>
                                            </a>
                                            
                                            <ul class="max-h-0 min-w-56 w-full opacity-0 invisible transition-all duration-500 dropdown-item">
                                                <li>
                                                    <a href="blog.html" class="text-[#385469] font-jost hover:text-secondary-foreground transition-all duration-500 py-2.5 px-6 block border-b border-b-slate-300">Blog</a>
                                                </li>
                                                <li>
                                                    <a href="blog-details.html" class="text-[#385469] font-jost hover:text-secondary-foreground transition-all duration-500 py-2.5 px-6 block border-b border-b-slate-300">Blog Details</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li class="leading-[164%] relative w-full dropdown">
                                            <a href="#" class="font-jost py-2.5 border-b border-b-slate-300 text-[#385469] flex justify-between items-center">
                                                <span>Page</span>
                                                <i class="fa-solid fa-plus"></i>
                                            </a>
                                            
                                            <ul class="max-h-0 min-w-56 w-full opacity-0 invisible transition-all duration-500 dropdown-item">
                                                <li>
                                                    <a href="about.html" class="text-[#385469] font-jost hover:text-secondary-foreground transition-all duration-500 py-2.5 px-6 block border-b border-b-slate-300">About</a>
                                                </li>
                                                <li>
                                                    <a href="services.html" class="text-[#385469] font-jost hover:text-secondary-foreground transition-all duration-500 py-2.5 px-6 block border-b border-b-slate-300">Services</a>
                                                </li>
                                                <li>
                                                    <a href="service-details.html" class="text-[#385469] font-jost hover:text-secondary-foreground transition-all duration-500 py-2.5 px-6 block border-b border-b-slate-300">Service Details</a>
                                                </li>
                                                <li>
                                                    <a href="portfolio.html" class="text-[#385469] font-jost hover:text-secondary-foreground transition-all duration-500 py-2.5 px-6 block border-b border-b-slate-300">Portfolio</a>
                                                </li>
                                                <li>
                                                    <a href="faq.html" class="text-[#385469] font-jost hover:text-secondary-foreground transition-all duration-500 py-2.5 px-6 block border-b border-b-slate-300">Faq's</a>
                                                </li>
                                                <li>
                                                    <a href="contact.html" class="text-[#385469] font-jost hover:text-secondary-foreground transition-all duration-500 py-2.5 px-6 block border-b border-b-slate-300">Contact</a>
                                                </li>
                                            </ul>
                                        </li>

                                        <li class="leading-[164%] relative w-full ">
                                            <a href="contact.html" class="text-[#385469] font-jost hover:text-secondary-foreground transition-all duration-500 py-2.5 block border-b border-b-slate-300">Contact Us</a>
                                        </li>
                                    </ul>

                                    <!-- contact info start -->
                                    <div class="mt-5">
                                        <div>
                                            <h4 class="text-xl font-bold text-[#385469]">Contact Info</h4>
                                            <ul class="mt-5 flex flex-col gap-[15px]">
                                                <li>
                                                    <p>
                                                        <i class="fa-solid fa-phone text-primary-foreground"></i> <a href="" class="ml-2.5">(629) 555-0129</a>
                                                    </p>
                                                </li>
                                                <li>
                                                    <p> 
                                                        <i class="fa-solid fa-envelope text-primary-foreground"></i> <a href="" class="ml-2.5">info@example.com</a>
                                                    </p>
                                                </li>
                                                <li>
                                                    <p> 
                                                        <i class="fa-solid fa-location-dot text-primary-foreground"></i> <span class="ml-2.5">6391 Elgin St. Celina, 10299</span>
                                                    </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="mt-5">
                                            <a href="contact.html" class="bg-primary text-cream-foreground rounded-md sm:flex hidden items-center gap-2.5  btn after:bg-green"> Get A Quote <span><i class="fa-solid fa-arrow-right"></i></span> </a>
                                        </div>
                                        <ul class="flex items-center gap-[14px] mt-6">
                                            <li><a href="" class="rounded-md w-11 h-11 flex items-center justify-center text-muted-foreground bg-background hover:bg-primary transition-all duration-500"><i class="fa-brands fa-facebook-f "></i></a></li>
                                            <li><a href="" class="rounded-md w-11 h-11 flex items-center justify-center text-muted-foreground bg-background hover:bg-primary transition-all duration-500"><i class="fa-brands fa-x-twitter"></i></a></li>
                                            <li><a href="" class="rounded-md w-11 h-11 flex items-center justify-center text-muted-foreground bg-background hover:bg-primary transition-all duration-500"><i class="fa-brands fa-linkedin"></i></a></li>
                                            <li><a href="" class="rounded-md w-11 h-11 flex items-center justify-center text-muted-foreground bg-background hover:bg-primary transition-all duration-500"><i class="fa-brands fa-pinterest-p"></i></a></li>
                                        </ul>
                                    </div>
                                    <!-- contact info end -->
                                </nav>
                            </div>
                            <!-- tab and mobile navbanr end -->

                            <!-- search, toggle and contact btn start -->
                            <div class="flex items-center gap-6 ">
                                <div class="ml-16 cursor-pointer search-btn">
                                    <i class="fa-solid fa-magnifying-glass "></i>
                                </div>
                                <!-- <p class="h-11 w-[1px] bg-muted xl:block hidden"></p> -->
                                <a href="contact.html" class="bg-secondary text-cream-foreground rounded-md sm:flex hidden items-center gap-2.5  btn after:bg-green"> Get A Quote <span><i class="fa-solid fa-arrow-right"></i></span> </a>
                                <div class="block xl:hidden">
                                    <div class="flex flex-col items-end cursor-pointer transition-all duration-500 offcanvaTragger">
                                        <span class="block h-[3px] w-5 bg-muted"></span>
                                        <span class="block h-[3px] w-7.5 bg-muted mt-2"></span>
                                        <span class="block h-[3px] w-5 bg-muted mt-2"></span>
                                    </div>
                                </div>
                            </div>
                            <!-- search, toggle and contact btn end -->
                            <form action="#" class="opacity-0 invisible transition-all duration-500 absolute left-0 bottom-0 w-full lg:h-[calc(100%-32%)] md:h-[calc(100%-50%)] h-[calc(100%-0%)] search-form ">
                                <input type="text" name="search" id="search" placeholder="Search here" class="w-full h-full border border-gray-400 px-10 rounded-md outline-none">
                                <label for="search" class="absolute right-10 top-1/2 -translate-y-1/2 cursor-pointer search-close">
                                    <i class="fa-solid fa-xmark border-gray-400  text-xl"></i>
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- bottom header -->
        </div>
    </header>

Business Information:
${baseInfo}

Page Title: ${title}

${commonInstructions}`;

        case 'about':
            return `Create an engaging "About Us" page that includes:

1. Our Story:
- Founding story and vision
- Growth and milestones
- Community involvement
- Parent testimonials

2. Mission & Values:
- Core values and beliefs
- Educational philosophy
- Commitment to excellence
- Parent partnership approach

3. Our Team:
- Leadership profiles
- Staff qualifications
- Ongoing training
- Background checks

4. Facility Features:
- Safety measures
- Learning environments
- Outdoor spaces
- Technology integration

Business Information:
${baseInfo}

Page Title: ${title}

${commonInstructions}`;

        case 'programs':
            return `Create a comprehensive programs page that includes:

1. Educational Philosophy:
- Teaching methodology
- Learning objectives
- Assessment approach
- Parent communication

2. Age-Specific Programs:
- Infant care (0-12 months)
- Toddler program (1-2 years)
- Preschool (3-5 years)
- Before/after school care

3. Daily Schedule:
- Sample routines
- Learning activities
- Meals and rest
- Special events

4. Development Focus:
- Social-emotional growth
- Cognitive development
- Physical skills
- Language acquisition

Business Information:
${baseInfo}

Page Title: ${title}

${commonInstructions}`;

        case 'contact':
            return `Create a welcoming contact page that includes:

1. Get in Touch:
- Warm welcome message
- Multiple contact methods
- Response time expectations
- Emergency procedures

2. Visit Us:
- Location details
- Operating hours
- Parking information
- Tour scheduling

3. Quick Connect:
- Phone numbers
- Email addresses
- Social media links
- Newsletter signup

4. Additional Information:
- FAQs
- Enrollment process
- Required documents
- Next steps

Business Information:
${baseInfo}

Page Title: ${title}

${commonInstructions}`;

        default:
            return `Create professional content for a custom page that includes:

1. Main Content:
- Clear introduction
- Key information
- Supporting details
- Visual elements

2. Value Proposition:
- Unique benefits
- Parent advantages
- Quality assurance
- Success stories

3. Supporting Information:
- Relevant data
- Case studies
- Expert insights
- Resources

4. Next Steps:
- Clear guidance
- Contact options
- Additional resources
- Call to action

Business Information:
${baseInfo}

Page Title: ${title}

${commonInstructions}`;
    }
}