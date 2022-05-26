-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 18, 2022 at 06:01 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `almconnect`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `fullname`, `username`, `password`) VALUES
(1, 'Aditya Sharma', 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `colleges`
--

CREATE TABLE `colleges` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `address` text NOT NULL,
  `photo` text NOT NULL,
  `status` varchar(20) NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `colleges`
--

INSERT INTO `colleges` (`id`, `name`, `address`, `photo`, `status`, `createdat`) VALUES
(1, 'Meerut Institute of Engineering and Technology, Meerut', 'NH-58, Baghpat Road, Bypass Crossing, Meerut (250005) UP (India)', '/colleges/file-1639417645921.jpg', 'Approved', '2021-12-13 18:04:18'),
(2, 'Rakshpal Bahadur Management Institute, Bareilly', 'Near ITBP, Bareilly, Uttar Pradesh 243001', '/colleges/file-1639418387817.png', 'Approved', '2021-12-13 18:04:18'),
(3, 'Galgotias University, Greater Noida', 'Plot No. 2, Yamuna Expy, Opposite, Buddha International Circuit, Sector 17A, Greater Noida, Uttar Pradesh 203201', '/colleges/file-1639418401758.png', 'Approved', '2021-12-13 18:04:18'),
(4, 'GL Bajaj Institute of Technology and Management, Greater Noida', 'Plot No, 2, APJ Abdul Kalam Rd, Knowledge Park III, Greater Noida, Uttar Pradesh 201306', '/colleges/file-1639418457266.jpg', 'Approved', '2021-12-13 18:04:18'),
(5, 'IIMT Group Of Colleges Greater Noida', 'Plot No. 19 & 20, Knowledge Park III, Greater Noida, Uttar Pradesh 201310', '/colleges/file-1639419400834.jpg', 'Approved', '2021-12-13 18:16:40');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `commentText` text NOT NULL,
  `postId` int(11) NOT NULL,
  `commentedBy` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `commentText`, `postId`, `commentedBy`, `createdAt`, `updatedAt`) VALUES
(1, 'Awesome Pic Bro', 4, 835558995372, '2022-03-06 15:54:19', NULL),
(2, '@Aditya Sharma Awesome Bro', 2, 835558995372, '2022-03-06 15:56:16', NULL),
(3, 'Nice Bro', 4, 826445991469, '2022-03-06 17:18:57', NULL),
(4, 'Adita Sharma Kehta Hain Ki Ye Post Must Hai', 3, 826445991469, '2022-03-06 17:48:25', NULL),
(5, 'Akhil Bhai Post Bahut Must Hai', 1, 826445991469, '2022-03-06 17:51:28', NULL),
(6, 'Bahut Acha Sharma Ji', 4, 821410558924, '2022-03-08 05:49:10', NULL),
(7, 'Thank You Bro', 1, 821410558924, '2022-03-08 13:09:03', NULL),
(8, 'This is a Very Intrusting Team i love it &hearts;', 5, 128329650311, '2022-03-08 16:37:38', NULL),
(9, 'now i am commenting .....', 6, 826445991469, '2022-03-09 05:42:03', NULL),
(10, 'Ye Website To Bahut Achi Hai', 8, 835558995372, '2022-03-09 15:59:00', NULL),
(11, 'This is very important information....', 14, 826445991469, '2022-03-24 16:22:38', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `connections`
--

CREATE TABLE `connections` (
  `id` int(11) NOT NULL,
  `user1` bigint(20) NOT NULL,
  `user2` bigint(20) NOT NULL,
  `status` varchar(20) NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `connections`
--

INSERT INTO `connections` (`id`, `user1`, `user2`, `status`, `createdat`) VALUES
(1, 826445991469, 835558995372, 'Accepted', '2022-03-05 06:23:48'),
(2, 835558995372, 826445991469, 'Accepted', '2022-03-06 06:02:40'),
(3, 826445991469, 821410558924, 'Accepted', '2022-03-06 06:46:03'),
(4, 826445991469, 128329650311, 'Accepted', '2022-03-06 06:46:25'),
(5, 128329650311, 821410558924, 'Accepted', '2022-03-08 16:53:31'),
(6, 1083346748089, 826445991469, 'Accepted', '2022-03-14 08:22:05');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `feedbacktext` text NOT NULL,
  `loginid` bigint(20) NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `type` varchar(100) NOT NULL,
  `typeId` int(11) NOT NULL,
  `likedById` bigint(20) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `type`, `typeId`, `likedById`, `createdAt`) VALUES
(2, 'Post', 4, 821410558924, '2022-03-08 13:05:37'),
(4, 'Post', 4, 128329650311, '2022-03-08 13:06:39'),
(6, 'Comment', 6, 835558995372, '2022-03-08 13:07:38'),
(7, 'Comment', 6, 821410558924, '2022-03-08 13:07:58'),
(8, 'Comment', 5, 821410558924, '2022-03-08 13:08:04'),
(10, 'Comment', 7, 821410558924, '2022-03-08 13:09:06'),
(11, 'Comment', 7, 826445991469, '2022-03-08 13:09:22'),
(15, 'Post', 2, 826445991469, '2022-03-08 13:10:24'),
(18, 'Comment', 4, 826445991469, '2022-03-08 16:29:07'),
(19, 'Post', 5, 128329650311, '2022-03-08 16:37:01'),
(20, 'Comment', 8, 128329650311, '2022-03-08 16:37:48'),
(21, 'Post', 5, 821410558924, '2022-03-08 17:39:49'),
(22, 'Post', 6, 821410558924, '2022-03-08 18:06:05'),
(27, 'Comment', 3, 826445991469, '2022-03-09 05:48:32'),
(28, 'Comment', 2, 826445991469, '2022-03-09 05:48:58'),
(29, 'Post', 7, 835558995372, '2022-03-09 08:18:42'),
(37, 'Post', 8, 826445991469, '2022-03-09 15:08:55'),
(38, 'Post', 7, 826445991469, '2022-03-09 15:08:58'),
(41, 'Post', 4, 826445991469, '2022-03-09 15:09:08'),
(42, 'Post', 3, 826445991469, '2022-03-09 15:09:11'),
(43, 'Post', 1, 826445991469, '2022-03-09 15:09:14'),
(44, 'Post', 6, 826445991469, '2022-03-09 15:09:19'),
(45, 'Post', 5, 826445991469, '2022-03-09 15:09:22'),
(46, 'Comment', 2, 835558995372, '2022-03-09 15:55:21'),
(47, 'Post', 8, 835558995372, '2022-03-09 15:55:30'),
(48, 'Comment', 10, 835558995372, '2022-03-09 15:59:20'),
(49, 'Comment', 7, 128329650311, '2022-03-09 17:30:27'),
(50, 'Post', 6, 128329650311, '2022-03-09 17:31:32'),
(51, 'Post', 3, 835558995372, '2022-03-11 04:39:22'),
(52, 'Post', 14, 1083346748089, '2022-03-14 08:31:53'),
(53, 'Post', 14, 826445991469, '2022-03-14 08:36:00'),
(54, 'Post', 18, 835558995372, '2022-03-15 08:02:43'),
(55, 'Post', 18, 826445991469, '2022-03-21 07:49:42'),
(56, 'Comment', 11, 826445991469, '2022-03-24 16:22:40');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) NOT NULL,
  `sender` bigint(20) NOT NULL,
  `reciever` bigint(20) NOT NULL,
  `message` text NOT NULL,
  `media` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender`, `reciever`, `message`, `media`, `createdAt`) VALUES
(1, 826445991469, 835558995372, 'Hii Aditya Pandey\r\nHow Are You ?', NULL, '2022-03-21 09:19:39'),
(2, 835558995372, 826445991469, 'Hello Aditya Sharma JI I am Fine and What about u ?', NULL, '2022-03-21 10:04:22'),
(3, 826445991469, 835558995372, 'i am also fine !!!', NULL, '2022-03-21 10:05:34'),
(4, 835558995372, 826445991469, 'what r u doing now a days', NULL, '2022-03-21 10:11:27'),
(5, 835558995372, 826445991469, 'what r u doing now a days ?', NULL, '2022-03-21 10:12:20'),
(6, 835558995372, 826445991469, 'a', NULL, '2022-03-21 10:13:20'),
(7, 835558995372, 826445991469, 'a', NULL, '2022-03-21 10:13:32'),
(8, 835558995372, 826445991469, 'a', NULL, '2022-03-21 10:13:57'),
(9, 835558995372, 826445991469, 'kya ho reha', NULL, '2022-03-21 10:14:20'),
(10, 835558995372, 826445991469, 'aaaaaaaaaaaa', NULL, '2022-03-21 10:15:54'),
(11, 835558995372, 826445991469, 'adasdas', NULL, '2022-03-21 10:16:28'),
(12, 835558995372, 826445991469, 'aaa', NULL, '2022-03-21 10:16:45'),
(13, 826445991469, 835558995372, 'nbsfds ksfjds', NULL, '2022-03-21 10:17:36'),
(14, 826445991469, 821410558924, 'hiiii', NULL, '2022-03-21 10:18:44'),
(15, 826445991469, 835558995372, 'hii', NULL, '2022-03-21 10:24:03'),
(16, 826445991469, 821410558924, 'kya haal hai', NULL, '2022-03-21 10:24:38'),
(17, 826445991469, 821410558924, 'aur suno', NULL, '2022-03-21 10:24:49'),
(18, 835558995372, 826445991469, 'gfhdsf', NULL, '2022-03-21 10:37:55'),
(19, 835558995372, 826445991469, 'shgfjh', NULL, '2022-03-21 10:37:57'),
(20, 835558995372, 826445991469, 'ghsfjs', NULL, '2022-03-21 10:37:59'),
(21, 835558995372, 826445991469, 'shdfghs', NULL, '2022-03-21 10:38:00'),
(22, 835558995372, 826445991469, 'a', NULL, '2022-03-21 10:58:02'),
(23, 835558995372, 826445991469, 'ad', NULL, '2022-03-21 11:02:35'),
(24, 826445991469, 835558995372, 'kya haal hai', NULL, '2022-03-21 11:03:48'),
(25, 835558995372, 826445991469, 'badhiya hai bhai', NULL, '2022-03-21 11:03:58'),
(26, 835558995372, 826445991469, 'apne bato', NULL, '2022-03-21 11:04:05'),
(27, 826445991469, 835558995372, 'hum bhi theek hai', NULL, '2022-03-21 11:04:14'),
(28, 826445991469, 835558995372, 'aur kaisi chal rhi hai job', NULL, '2022-03-21 11:04:34'),
(29, 835558995372, 826445991469, 'badhiya chl rhi hai bro', NULL, '2022-03-21 11:04:47'),
(30, 826445991469, 835558995372, 'acha', NULL, '2022-03-21 11:07:38'),
(31, 835558995372, 826445991469, 'hmmm', NULL, '2022-03-21 11:09:50'),
(32, 826445991469, 835558995372, 'aur bato', NULL, '2022-03-21 11:10:13'),
(33, 835558995372, 826445991469, 'aur sb badhiya hai', NULL, '2022-03-21 11:18:40'),
(34, 826445991469, 128329650311, 'hiiiii', NULL, '2022-03-21 11:26:45'),
(35, 826445991469, 835558995372, 'acha', NULL, '2022-03-24 16:12:33'),
(36, 826445991469, 1160415602329, 'Hiii', NULL, '2022-03-24 16:13:01'),
(37, 128329650311, 826445991469, 'hello', NULL, '2022-04-13 09:12:18'),
(38, 826445991469, 128329650311, 'Hello', NULL, '2022-04-13 09:15:05'),
(39, 826445991469, 128329650311, 'Hello 123', NULL, '2022-04-13 09:15:35'),
(40, 826445991469, 128329650311, 'Aur Kaise Ho', NULL, '2022-04-13 09:15:59');

-- --------------------------------------------------------

--
-- Table structure for table `messageUsers`
--

CREATE TABLE `messageUsers` (
  `id` bigint(20) NOT NULL,
  `sender` bigint(20) NOT NULL,
  `reciever` bigint(20) NOT NULL,
  `lastUpdate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messageUsers`
--

INSERT INTO `messageUsers` (`id`, `sender`, `reciever`, `lastUpdate`) VALUES
(1, 826445991469, 835558995372, '2022-03-24 16:12:33'),
(2, 821410558924, 826445991469, '2022-03-21 10:24:49'),
(3, 826445991469, 128329650311, '2022-04-13 09:15:59'),
(4, 826445991469, 1160415602329, '2022-03-24 16:13:01');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `noti_text` text NOT NULL,
  `userid_from` bigint(20) NOT NULL,
  `userid_to` bigint(20) NOT NULL,
  `status` varchar(50) NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `noti_text`, `userid_from`, `userid_to`, `status`, `datetime`) VALUES
(1, 'FollowRequest', 826445991469, 835558995372, 'Read', '2022-03-05 06:24:05'),
(2, 'FollowRequest', 835558995372, 826445991469, 'Read', '2022-03-06 06:02:56'),
(3, 'FollowRequest', 826445991469, 821410558924, 'Read', '2022-03-06 06:50:18'),
(4, 'FollowRequest', 826445991469, 128329650311, 'Read', '2022-03-08 08:37:55'),
(5, 'FollowRequest', 128329650311, 821410558924, 'Read', '2022-03-08 17:28:27'),
(14, 'FollowRequest', 1083346748089, 826445991469, 'Read', '2022-03-14 08:35:19'),
(15, 'NewPost', 1083346748089, 14, 'Read', '2022-03-14 08:55:21'),
(17, 'NewPost', 1493264725306, 17, 'Unread', '2022-03-15 07:16:09'),
(18, 'NewPost', 2, 18, 'Unread', '2022-03-15 07:18:41');

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` bigint(20) NOT NULL,
  `name` text NOT NULL,
  `type` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `phonenumbers` varchar(15) NOT NULL,
  `emails` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `foundedyear` int(11) NOT NULL,
  `logo` text NOT NULL,
  `createdby` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `name`, `type`, `address`, `phonenumbers`, `emails`, `description`, `foundedyear`, `logo`, `createdby`) VALUES
(1, 'Grabonic Technologies', 'Software Development', 'Shahjahanpur, Uttar Pradesh, India 242001', '+916392919732', 'aditya242401@gmail.com', '', 2017, '/pages/file-1646562413500.jpg', 826445991469),
(2, 'Meerut Institute of Engineering and Technology, Meerut', 'Educational', 'NH-58, Baghpat Road, Bypass Crossing, Meerut (250005) UP (India)', '+911234567890', 'mioet@abc.com', '', 1999, '/pages/file-1646572116387.jpg', 835558995372),
(3, 'GL Bajaj Institute of Technology and Management, Greater Noida', 'Educational', 'Plot No, 2, APJ Abdul Kalam Rd, Knowledge Park III, Greater Noida, Uttar Pradesh 201306', '+911234567890', 'glbajaj@abc.com', 'This is a Very Good College in Greater Noida.', 1990, '/pages/file-1646577162752.jpg', 835558995372);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `posttext` text NOT NULL,
  `postimg` text DEFAULT NULL,
  `authorType` varchar(100) NOT NULL,
  `author` bigint(20) NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedat` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `posttext`, `postimg`, `authorType`, `author`, `createdat`, `updatedat`) VALUES
(1, '[object Object]', '/users/821410558924/file-1639600680191.jpg', 'User', 821410558924, '2021-12-15 20:38:00', NULL),
(2, 'Hello My name is Aditya Sharma.\r\nThis is the project for testing on 18-01-2022.', '', 'User', 826445991469, '2022-01-18 10:29:32', NULL),
(3, 'Aditya Pandey is Here .....\r\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur amet minima optio pariatur non velit excepturi, veritatis similique nulla cum necessitatibus laboriosam eveniet quae voluptatem fugiat expedita ex blanditiis enim.', NULL, 'User', 835558995372, '2022-03-05 06:26:56', NULL),
(4, '', '/users/826445991469/file-1646542320136.png', 'User', 826445991469, '2022-03-06 04:52:00', NULL),
(5, 'Hiiii Guys My Name is Prashant Thakur Currently I am Working In Motherson Sumi. I\'m Sharing A Dream 11 Team Image.', '/users/128329650311/file-1646757325968.jpg', 'User', 128329650311, '2022-03-08 16:35:26', NULL),
(6, 'Happy Woman\'s Day To All The Lady ', '/users/821410558924/file-1646762759610.jpg', 'User', 821410558924, '2022-03-08 18:05:59', NULL),
(7, 'Blog\r\nA blog (a truncation of \"weblog\")[1] is a discussion or informational website published on the World Wide Web consisting of discrete, often informal diary-style text entries (posts). Posts are typically displayed in reverse chronological order, so that the most recent post appears first, at the top of the web page. Until 2009, blogs were usually the work of a single individual,[citation needed] occasionally of a small group, and often covered a single subject or topic. In the 2010s, \"multi-author blogs\" (MABs) emerged, featuring the writing of multiple authors and sometimes professionally edited. MABs from newspapers, other media outlets, universities, think tanks, advocacy groups, and similar institutions account for an increasing quantity of blog traffic. The rise of Twitter and other \"microblogging\" systems helps integrate MABs and single-author blogs into the news media. Blog can also be used as a verb, meaning to maintain or add content to a blog. ', NULL, 'User', 835558995372, '2022-03-09 08:18:34', NULL),
(8, 'वसा अर्थात चिकनाई शरीर को क्रियाशील बनाए रखने मे सहयोग करती है। वसा शरीर के लिए उपयोगी है, किंतु इसकी अधिकता हानिकारक भी हो सकती है। यह मांस तथा वनस्पति समूह दोनो प्रकार से प्राप्त होती है। इससे शरीर को दैनिक कार्यो के लिए शक्ति प्राप्त होती है। इसको शक्तिदायक ईंधन भी कहा जाता है। एक स्वस्थ व्यक्ति के लिए १०० ग्राम चिकनाई का प्रयोग करना अति आवश्यक माना जाता है। इसको पचाने में शरीर को कफ़ी समय लगता है। यह शरीर मे प्रोटीन की आवश्यकता को कम करने के लिए आवश्यक होती है। वसा का शरीर मे अत्यधिक मात्रा मे बढ जाना उचित नही होता है। यह संतुलित आहार द्वारा आवश्यक मात्रा मे ही शरीर को उपलब्ध कराई जानी चाहिए। अधिक मात्रा जानलेवा भी हो सकती है, यह ध्यान योग्य है। यह आमाशय की गतिशीलता मे कमी ला देती है तथा भूख कम कर देती है। इससे आमाशय की वृद्धि होती है। ', NULL, 'User', 826445991469, '2022-03-09 08:21:34', NULL),
(14, 'Hello Guys My Name is Arpit Sharma and i am Sharing Some Information...\r\n\r\nग्लेशियर नेशनल पार्क अमेरिकी राष्ट्रीय उद्यान है, जो कि कनाडा-संयुक्त राज्य अमेरिका की सीमा पर स्थित है। उद्यान संयुक्त राज्य के उत्तर-पश्चिमी मोंटाना राज्य में स्थित है और कनाडा की ओर अल्बर्टा और ब्रिटिश कोलम्बिया प्रांतों से सटा हुआ है। उद्यान दस लाख एकड़ (4,000 किमी2) से अधिक क्षेत्र में फैला हुआ है और इसमें दो पर्वत श्रृंखला (रॉकी पर्वत की उप-श्रेणियाँ), 130 से अधिक नामित झीलें, 1,000 से अधिक विभिन्न पौधों की प्रजातियां और सैकड़ों वन्यजीवों की प्रजातियां शामिल हैं। इस विशाल प्राचीन पारिस्थितिकी तंत्र को जो कि 16,000 वर्ग मील (41,000 किमी2) में शामिल संरक्षित भूमि का भाग है, \"क्राउन ऑफ़ द कॉन्टिनेंट इकोसिस्टम\" के रूप में संदर्भित किया गया है', NULL, 'User', 1083346748089, '2022-03-14 08:22:49', NULL),
(17, 'This is my first post  and i\'m very excited about this social app and  i\'m gonna use it on the daily basis.', NULL, 'User', 1493264725306, '2022-03-15 07:16:09', NULL),
(18, '!! Something is better then nothing !!', NULL, 'Page', 2, '2022-03-15 07:18:41', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(11) NOT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  `dob` varchar(20) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `address` text DEFAULT NULL,
  `aboutu` text DEFAULT NULL,
  `hobbies` varchar(255) DEFAULT NULL,
  `profile_pic` text NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedat` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `dob`, `gender`, `mobile`, `email`, `password`, `address`, `aboutu`, `hobbies`, `profile_pic`, `createdat`, `updatedat`) VALUES
(128329650311, 'Prashant Thakur', '1999-12-19', 'Others', '9847563210', 'prashant@abc.com', 'prashant', 'Khatta Baghpat 250615', 'I am Project Trainee in Motherson Sumi.', 'Playing Cricket, Listening Music, Playing Chess', '/users/128329650311/file-1639758321032.jpg', '2021-12-17 16:20:14', '2021-12-17 16:25:21'),
(821410558924, 'Akhil Kumar', '1996-04-07', 'Female', '8529637410', 'akhil@abc.com', 'akhil', 'Khatta, Prahladpur, Baghpath 250615', 'I am a Programmer Analyst Trainee at SassWorx.', 'Playing Cricket, Listening Music', '/users/821410558924/file-1639684453319.jpg', '2021-12-14 16:47:53', '0000-00-00 00:00:00'),
(826445991469, 'Aditya Sharma', '2001-02-01', 'Male', '1234567890', 'aditya@abc.com', 'aditya', 'Powayan, Shahajahanpur', 'I am a Software Engineer.', 'Coding, Designing', '/users/826445991469/file-1646558687199.jpg', '2021-12-12 06:08:51', '2022-03-06 09:24:47'),
(835558995372, 'Aditya Pandey', '1997-06-07', 'Male', '0129384756', 'pandey@abc.com', 'pandey', 'Renukoot', 'I am a Software Engineer.', 'Reading Books, Doing Workout', '/users/835558995372/file-1646572933912.jpg', '2021-12-12 08:03:02', '2022-03-06 13:22:13'),
(992438823155, '', '', '', '', '', '', '', '', '', '/images/.jpg', '2022-03-15 06:46:08', NULL),
(1083346748089, 'Arpit Sharma', '2000-04-02', 'Male', '8449407886', 'arpit@abc.com', 'arpit', 'Vill Nizampur Post Sirasaul Bilsi Buduan', 'I am a Software Traniee at KiwiTech.', 'Reading Books, Coding, Cricket', '/images/Male.jpg', '2022-03-14 08:21:16', NULL),
(1160415602329, 'Suraj Saini', '1995-01-04', 'Male', '4609273546', 'suraj@abc.com', 'suraj', 'Village & Post Subhanpur Baghpat Uttar Pradesh India', 'I am a Software Engineer at Leasing Monk.', 'Playing Vollyboll, Doing Excercise', '/images/Male.jpg', '2022-03-14 16:05:55', NULL),
(1493264725306, 'Rock Sharma', '2001-01-01', 'Male', '6483748374', 'rock@abc.com', 'rock', 'lshfsa fkjabfnskjfa sfkbasjfask fas', 'jdklsd jashfkj', 'sdjkshdnjk', '/images/Male.jpg', '2022-03-15 06:20:43', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_educations`
--

CREATE TABLE `user_educations` (
  `id` int(11) NOT NULL,
  `userid` bigint(20) NOT NULL,
  `school` varchar(255) NOT NULL,
  `degree` varchar(100) NOT NULL,
  `fieldofstudy` varchar(100) NOT NULL,
  `startdate` date NOT NULL,
  `enddate` date NOT NULL,
  `description` text NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedat` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_educations`
--

INSERT INTO `user_educations` (`id`, `userid`, `school`, `degree`, `fieldofstudy`, `startdate`, `enddate`, `description`, `createdat`, `updatedat`) VALUES
(1, 826445991469, 'GL Bajaj Institute of Technology and Management, Greater Noida', 'MCA', 'Computer Science', '2020-12-01', '2022-06-22', '', '2021-12-22 10:16:08', NULL),
(2, 826445991469, 'Rakshpal Bahadur Management Institute, Bareilly', 'BCA', 'Computer Science', '2017-08-01', '2020-08-07', '', '2021-12-22 17:06:03', NULL),
(3, 835558995372, 'GL Bajaj Institute of Technology and Management, Greater Noida', 'MCA', 'Computer Programming', '2020-11-01', '2022-06-15', '', '2022-03-06 05:30:51', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `colleges`
--
ALTER TABLE `colleges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `connections`
--
ALTER TABLE `connections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messageUsers`
--
ALTER TABLE `messageUsers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_educations`
--
ALTER TABLE `user_educations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `colleges`
--
ALTER TABLE `colleges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `connections`
--
ALTER TABLE `connections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `messageUsers`
--
ALTER TABLE `messageUsers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `pages`
--
ALTER TABLE `pages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `user_educations`
--
ALTER TABLE `user_educations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
