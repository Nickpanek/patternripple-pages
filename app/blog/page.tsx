import Link from “next/link”;

// Mock blog posts - you can later move this to a database or CMS
const blogPosts = [
{
slug: “why-exclusive-patterns-matter”,
title: “Why Exclusive Patterns Matter in Modern Design”,
excerpt: “In a world saturated with stock designs, standing out has never been more important. Discover why exclusive patterns are becoming the secret weapon of successful designers.”,
date: “January 15, 2025”,
category: “Design Insights”,
readTime: “5 min read”
},
{
slug: “faux-embroidery-trend-2025”,
title: “The Faux Embroidery Trend: What’s Hot in 2025”,
excerpt: “Faux embroidery patterns are taking the design world by storm. Learn how to incorporate these textured beauties into your next project.”,
date: “January 10, 2025”,
category: “Trends”,
readTime: “3 min read”
},
{
slug: “commercial-rights-explained”,
title: “Understanding Commercial Rights for Digital Patterns”,
excerpt: “What can you actually do with your PatternRipple purchase? We break down commercial usage rights in simple terms.”,
date: “January 5, 2025”,
category: “Legal”,
readTime: “4 min read”
},
{
slug: “geometric-patterns-interior-design”,
title: “Using Geometric Patterns in Interior Design”,
excerpt: “From wallpapers to textiles, geometric patterns are transforming spaces. Here’s how to use them effectively.”,
date: “December 28, 2024”,
category: “Interior Design”,
readTime: “6 min read”
}
];

export default function BlogPage() {
return (
<div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
{/* Hero Section */}
<header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 py-16">
<div className="max-w-4xl mx-auto px-4 text-center">
<h1 className="text-4xl font-thin tracking-wide text-gray-900 mb-4">
PatternRipple Blog
</h1>
<p className="text-lg text-gray-600">
Design insights, pattern trends, and creative inspiration
</p>