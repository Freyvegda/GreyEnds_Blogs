import { useState, useEffect } from 'react';
import { ArrowRight, BookOpen, Feather, Users, Sparkles, TrendingUp, Heart } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { mockBlogs } from '../data/mockBlog';
import { Link } from 'react-router-dom';


export function Landing() {
  const featuredBlogs = mockBlogs.slice(0, 3);
  const [email, setEmail] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring" as const, stiffness: 100 },
        },
    } as const;


  const floatingVariants: Variants = {
        animate: {
            y: [0, -8, 0],
            transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut" as const,
            },
        },
    };


  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-orange-50 to-white overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-orange-300/20 to-rose-300/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x / 20,
            y: mousePosition.y / 20,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 0.3 }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-rose-300/20 to-orange-300/20 rounded-full blur-3xl"
          animate={{
            x: -mousePosition.x / 30,
            y: -mousePosition.y / 30,
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 0.4 }}
          style={{ bottom: '20%', right: '10%' }}
        />
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 relative">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full mb-6 border border-orange-200"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(251, 146, 60, 0.2)' }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Feather className="w-4 h-4 text-orange-500" />
              </motion.div>
              <span className="text-slate-600 text-sm">Welcome to GreyEnds Blogs</span>
              <Sparkles className="w-3 h-3 text-rose-400" />
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-slate-800 mb-6"
            variants={itemVariants}
          >
            Where Stories Come to{' '}
            <motion.span
              className="inline-block bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Life
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-slate-600 text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Discover thoughtful articles, personal reflections, and inspiring stories from our community of writers.
            Join us on a journey of creativity and self-expression.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            variants={itemVariants}
          >
            <Link to='/signin'>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-gradient-to-r from-orange-400 to-rose-400 hover:from-orange-500 hover:to-rose-500 text-white px-8 shadow-lg">
                  Explore Blogs
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Button>
              </motion.div>
            </Link>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                Start Writing
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 text-orange-300"
          variants={floatingVariants}
          animate="animate"
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>
        <motion.div
          className="absolute top-32 right-20 text-rose-300"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 0.5 }}
        >
          <Heart className="w-5 h-5" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <motion.section
        className="container mx-auto px-4 py-8 mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8">
          {[
            { label: 'Published Blogs', value: '150+', icon: BookOpen },
            { label: 'Active Writers', value: '50+', icon: Users },
            { label: 'Monthly Readers', value: '10K+', icon: TrendingUp },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.1, y: -5 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-300 to-rose-400 rounded-xl mb-2">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-slate-800">{stat.value}</div>
              <div className="text-slate-500 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {[
            {
              icon: BookOpen,
              title: 'Rich Content',
              description: 'Dive into well-crafted articles covering diverse topics from personal growth to creative pursuits.',
              gradient: 'from-orange-300 to-rose-400',
              borderColor: 'border-orange-200'
            },
            {
              icon: Users,
              title: 'Community',
              description: 'Connect with like-minded readers and writers who share your passion for meaningful content.',
              gradient: 'from-rose-300 to-orange-400',
              borderColor: 'border-rose-200'
            },
            {
              icon: Feather,
              title: 'Express Yourself',
              description: 'Share your thoughts, experiences, and creativity with a supportive audience.',
              gradient: 'from-orange-400 to-rose-300',
              borderColor: 'border-orange-200'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className={`${feature.borderColor} bg-white/60 backdrop-blur-sm h-full hover:shadow-xl transition-shadow`}>
                <CardContent className="pt-6">
                  <motion.div
                    className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4`}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Blogs Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-slate-800 mb-4">Featured Stories</h2>
            <p className="text-slate-600">
              Handpicked articles from our talented writers
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {featuredBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link to={'/signin'}>
                  <Card className="h-full hover:shadow-2xl transition-all border-slate-200 cursor-pointer overflow-hidden group">
                    <CardContent className="pt-6 relative">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-rose-400/10 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      
                      <div className="relative z-10">
                        <motion.div
                          className="flex items-center gap-2 mb-3"
                          initial={{ x: -20, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <motion.div
                            className="w-8 h-8 bg-gradient-to-br from-orange-300 to-rose-400 rounded-full flex items-center justify-center text-white text-xs"
                            whileHover={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.5 }}
                          >
                            {blog.authorAvatar}
                          </motion.div>
                          <div className="flex flex-col">
                            <span className="text-slate-700 text-sm">{blog.author}</span>
                            <span className="text-slate-500 text-xs">{blog.date}</span>
                          </div>
                        </motion.div>
                        
                        <h3 className="text-slate-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                          {blog.title}
                        </h3>
                        <p className="text-slate-600 text-sm line-clamp-3 mb-3">{blog.excerpt}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {blog.tags.slice(0, 2).map((tag, tagIndex) => (
                            <motion.span
                              key={tagIndex}
                              className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full"
                              whileHover={{ scale: 1.1 }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                        
                        <span className="text-slate-500 text-xs">{blog.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/signin">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                  View All Blogs
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Newsletter Section */}
      <motion.section
        className="container mx-auto px-4 py-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="bg-gradient-to-br from-orange-100 to-rose-100 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <motion.div
              className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-300/30 to-rose-300/30 rounded-full blur-2xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-6 shadow-lg">
                  <Sparkles className="w-8 h-8 text-orange-500" />
                </div>
              </motion.div>
              
              <h2 className="text-slate-800 mb-4">Stay Updated</h2>
              <p className="text-slate-600 mb-6 max-w-xl mx-auto">
                Subscribe to our newsletter and never miss a story. Get weekly highlights delivered to your inbox.
              </p>
              
              <motion.form
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                onSubmit={(e) => {
                  e.preventDefault();
                  setEmail('');
                  alert('Thank you for subscribing!');
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white flex-1"
                  required
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-orange-400 to-rose-400 hover:from-orange-500 hover:to-rose-500 text-white w-full sm:w-auto"
                  >
                    Subscribe
                  </Button>
                </motion.div>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Decorative Image */}
      <motion.div
        className="fixed bottom-0 right-0 pointer-events-none opacity-60 z-0"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
      </motion.div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 mt-20 border-t border-slate-200 relative z-10">
        <motion.div
          className="max-w-5xl mx-auto text-center text-slate-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>© 2025 GreyEnds Blogs. All rights reserved.</p>
        </motion.div>
      </footer>
    </div>
  );
}
